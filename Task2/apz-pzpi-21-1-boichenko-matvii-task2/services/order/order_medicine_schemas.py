import uuid

from pydantic import BaseModel
from pydantic_partial import create_partial_model

from common.common_schemas import UuidDto


class CreateOrderMedicineDto(BaseModel):
    order_id: uuid.UUID
    medicine_id: uuid.UUID
    medicine_count: int


PatchOrderMedicineDto = create_partial_model(CreateOrderMedicineDto)


class PutOrderMedicineDto(CreateOrderMedicineDto):
    pass


class OrderMedicineResponseDto(CreateOrderMedicineDto, UuidDto):
    pass
