import uuid

from pydantic import BaseModel
from pydantic_partial import create_partial_model

from common.common_schemas import UuidDto
from database.models import OrderStatus, Currencies


class MedicineInfoDto(BaseModel):
    id: uuid.UUID
    count: int


class CreateOrderDto(BaseModel):
    user_id: uuid.UUID
    machine_id: uuid.UUID | None
    pickup_point_id: uuid.UUID
    status: OrderStatus
    payment_currency: Currencies

    medicines: list[MedicineInfoDto] = []


class PutOrderDto(CreateOrderDto):
    user_id: uuid.UUID
    machine_id: uuid.UUID | None
    pickup_point_id: uuid.UUID
    status: OrderStatus
    payment_currency: Currencies


PatchOrderDto = create_partial_model(PutOrderDto)


class OrderResponseDto(PutOrderDto, UuidDto):
    pass
