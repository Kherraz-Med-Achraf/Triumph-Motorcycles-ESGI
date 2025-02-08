import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleNotFoundException } from "../../../domain/exceptions/clientMotorcycle/ClientMotorcycleNotFoundException";
import { ClientMotorcycleEntity } from "../../../domain/entities/ClientMotorcycleEntity";

export class GetClientMotorcycleUseCase {
  constructor(private linkRepo: ClientMotorcycleRepository) {}

  async execute(linkId: string): Promise<ClientMotorcycleEntity> {
    const existing = await this.linkRepo.findById(linkId);
    if (!existing) {
      throw new ClientMotorcycleNotFoundException();
    }
    return existing;
  }
}
