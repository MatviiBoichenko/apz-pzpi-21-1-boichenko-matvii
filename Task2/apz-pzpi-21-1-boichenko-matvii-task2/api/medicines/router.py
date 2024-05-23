from uuid import UUID

from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import status

from dependencies.user import current_active_user
from services.medicine.medicine_service import MedicineCrudService
from services.medicine.schemas import CreateMedicineDto
from services.medicine.schemas import MedicineResponseDto
from services.medicine.schemas import PatchMedicineDto
from services.medicine.schemas import PutMedicineDto

medicines_router = APIRouter(prefix="/medicines", tags=["medicines"], dependencies=[Depends(current_active_user)])


@medicines_router.post("/", response_model=MedicineResponseDto, status_code=status.HTTP_201_CREATED)
async def create_medicine(create_medicine_dto: CreateMedicineDto,
                          service: MedicineCrudService = Depends(MedicineCrudService.get_instance)):
    return await service.post_medicine(create_medicine_dto)


@medicines_router.put("/{product_id}", response_model=MedicineResponseDto)
async def update_medicine(product_id: UUID, put_medicine_dto: PutMedicineDto,
                          service: MedicineCrudService = Depends(MedicineCrudService.get_instance)):
    return await service.put_medicine(product_id, put_medicine_dto)


@medicines_router.patch("/{product_id}", response_model=MedicineResponseDto)
async def patch_medicine(product_id: UUID, patch_medicine_dto: PatchMedicineDto,
                         service: MedicineCrudService = Depends(MedicineCrudService.get_instance)):
    return await service.patch_medicine(product_id, patch_medicine_dto)


@medicines_router.get("/{product_id}", response_model=MedicineResponseDto)
async def get_medicine(product_id: UUID, service: MedicineCrudService = Depends(MedicineCrudService.get_instance)):
    return await service.get_medicine_by_id(product_id)


@medicines_router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_medicine(product_id: UUID, service: MedicineCrudService = Depends(MedicineCrudService.get_instance)):
    success = await service.delete_medicine_by_id(product_id)
    if not success:
        raise HTTPException(status_code=404, detail="Medicine not found")
    return {"detail": "Medicine deleted successfully"}


@medicines_router.post("/search", response_model=list[MedicineResponseDto])
async def search_medicines(filters: dict, service: MedicineCrudService = Depends(MedicineCrudService.get_instance)):
    return await service.search_medicines(filters)
