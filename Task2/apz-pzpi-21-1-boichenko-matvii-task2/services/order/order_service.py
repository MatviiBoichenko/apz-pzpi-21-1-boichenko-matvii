import asyncio
from datetime import datetime, timezone
from uuid import UUID

from fastapi import HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from common.error_messages import ErrorMessages
from common.utils.mapping import db_row_to_pydantic
from database import db
from database.models import Order, Medicine
from services.base_service import BaseCrudService
from services.mqtt.mqtt_handlers_schemas import NewOrderRequest
from services.mqtt.mqtt_handlers_service import MQTTHandlersService
from services.order.order_schemas import *


class OrderCrudService(BaseCrudService[Order]):
    def __init__(self, db_session: AsyncSession, handlers_service: MQTTHandlersService):
        super().__init__(Order, db_session)
        self.handlers_service: MQTTHandlersService = handlers_service

    @classmethod
    def get_instance(cls, db_session: AsyncSession = Depends(db.get_session),
                     handlers_service: MQTTHandlersService = Depends(MQTTHandlersService.get_instance)):
        return cls(db_session=db_session, handlers_service=handlers_service)

    async def create_order(self, create_order_dto: CreateOrderDto):
        order_info = create_order_dto.model_dump()

        payment_amount = 0.0
        for med in create_order_dto.medicines:
            medicine = await Medicine.get(self.db, {"id": med.id})
            # print("AsyncLazyLoad", await medicine.awaitable_attrs.machine_medicine_slots)
            payment_amount += medicine.price * med.count
        order_info["payment_amount"] = payment_amount

        order: Order = await Order.create(self.db, **order_info)

        # TODO: Execute HERE payment logic, charge user account
        print("Processing payment...")
        await asyncio.sleep(3)
        order = await Order.update(self.db, {"id": order.id}, **{
            "status": OrderStatus.payed,
            "payment_date": datetime.now(tz=timezone.utc)
        })

        # request_body = NewOrderRequest(**{
        #     "order_id": str(order.id),
        #     "medicine_type": order.medicine.type,
        #     "medicine_name": order.medicine.name,
        #     "count": order.medicine_amount
        # })
        # await self.handlers_service.send_new_order_request(order.machine.mac, request_body)

        return await db_row_to_pydantic(order, OrderResponseDto)

    async def put_order(self, order_id: UUID, put_order_dto: PutOrderDto):
        order: Order = await Order.update(
            self.db, {"id": order_id}, **put_order_dto.model_dump())
        return await db_row_to_pydantic(order, OrderResponseDto)

    async def patch_order(self, order_id: UUID, patch_order_dto: PatchOrderDto):
        order: Order = await Order.update(
            self.db, {"id": order_id}, **patch_order_dto.model_dump(exclude_unset=True))
        return await db_row_to_pydantic(order, OrderResponseDto)

    async def get_order_by_id(self, order_id: UUID):
        order: Order = await Order.get(self.db, {"id": order_id})

        if not order:
            raise HTTPException(status_code=404, detail=ErrorMessages.order.ORDER_NOT_FOUND)

        return await db_row_to_pydantic(order, OrderResponseDto)

    async def delete_order_by_id(self, order_id: UUID):
        success: bool = await Order.delete(self.db, {"id": order_id})
        return success

    async def search_orders(self, search_filters: dict):
        orders: list[Order] = await Order.get_all(self.db, search_filters)

        results = []
        for order in orders:
            results.append(await db_row_to_pydantic(order, OrderResponseDto))

        return orders
