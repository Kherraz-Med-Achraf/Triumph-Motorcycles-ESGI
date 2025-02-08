import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { UpdateConcessionDTO, UpdateConcessionSchema } from "./UpdateConcessionDTO";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";

export class UpdateConcessionUseCase {
  constructor(private concessionRepo: ConcessionRepository) {}

  async execute(input: UpdateConcessionDTO): Promise<ConcessionEntity> {
    const dto = UpdateConcessionSchema.parse(input);

    // Vérifier l'existence
    const existing = await this.concessionRepo.findById(dto.id);
    if (!existing) {
      throw new ConcessionNotFoundException();
    }

    // Mettre à jour seulement les champs présents
    const updatedConcession = new ConcessionEntity(
      existing.id,
      dto.name ?? existing.name,
      dto.managerUserId ?? existing.managerUserId,
      dto.address ?? existing.address,
      existing.createdAt
    );

    return await this.concessionRepo.update(updatedConcession);
  }
}
