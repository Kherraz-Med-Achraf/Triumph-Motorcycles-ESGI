import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleNotFoundException } from "../../../domain/exceptions/clientMotorcycle/ClientMotorcycleNotFoundException";

export class DeleteClientMotorcycleUseCase {
  constructor(private linkRepo: ClientMotorcycleRepository) {}

  async execute(linkId: string): Promise<void> {
    const existing = await this.linkRepo.findById(linkId);
    if (!existing) {
      throw new ClientMotorcycleNotFoundException();
    }
    await this.linkRepo.delete(linkId);
  }
}
