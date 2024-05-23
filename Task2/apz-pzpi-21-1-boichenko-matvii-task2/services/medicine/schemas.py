from pydantic import BaseModel
from pydantic_partial import create_partial_model

from common.common_schemas import UuidDto
from database.models import MedicineType, Currencies


class CreateMedicineDto(BaseModel):
    type: MedicineType
    name: str
    description: str
    price: float
    currency: Currencies
    prescription_needed: bool
    is_available: bool


PatchMedicineDto = create_partial_model(CreateMedicineDto)


class PutMedicineDto(CreateMedicineDto):
    pass


class MedicineResponseDto(CreateMedicineDto, UuidDto):
    pass
