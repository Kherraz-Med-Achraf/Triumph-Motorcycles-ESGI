import { UpdateMotorcycleSchema, UpdateMotorcycleDTO } from "./UpdateMotorcycleDTO";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";

export class UpdateMotorcycleUseCase {
  constructor(private motoRepo: MotorcycleRepository) {}

  async execute(input: UpdateMotorcycleDTO): Promise<MotorcycleEntity> {
    const dto = UpdateMotorcycleSchema.parse(input);

    // Vérifier existence
    const existing = await this.motoRepo.findById(dto.id);
    if (!existing) {
      throw new MotorcycleNotFoundException();
    }

    // Mettre à jour champs
    const updatedMoto = new MotorcycleEntity(
      existing.id,
      dto.vin ?? existing.vin,
      dto.model ?? existing.model,
      dto.concessionId ?? existing.concessionId,
      existing.createdAt
    );

    return await this.motoRepo.update(updatedMoto);
  }
}
