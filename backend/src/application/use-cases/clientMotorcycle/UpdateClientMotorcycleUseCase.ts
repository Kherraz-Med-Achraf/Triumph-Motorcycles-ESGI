import { UpdateClientMotorcycleSchema, UpdateClientMotorcycleDTO } from "./UpdateClientMotorcycleDTO";
import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleNotFoundException } from "../../../domain/exceptions/clientMotorcycle/ClientMotorcycleNotFoundException";
import { ClientMotorcycleEntity } from "../../../domain/entities/ClientMotorcycleEntity";

export class UpdateClientMotorcycleUseCase {
  constructor(private linkRepo: ClientMotorcycleRepository) {}

  async execute(input: UpdateClientMotorcycleDTO): Promise<ClientMotorcycleEntity> {
    const dto = UpdateClientMotorcycleSchema.parse(input);

    // Trouver l'existant
    const existing = await this.linkRepo.findById(dto.id);
    if (!existing) {
      throw new ClientMotorcycleNotFoundException();
    }

    const assignedAt = dto.assignedAt ? new Date(dto.assignedAt) : existing.assignedAt;

    const updatedLink = new ClientMotorcycleEntity(
      existing.id,
      dto.clientId ?? existing.clientId,
      dto.motorcycleId ?? existing.motorcycleId,
      assignedAt,
      existing.createdAt
    );

    return await this.linkRepo.update(updatedLink);
  }
}
