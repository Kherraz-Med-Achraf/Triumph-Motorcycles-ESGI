import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleEntity } from "../../../domain/entities/ClientMotorcycleEntity";

export class GetAllClientMotorcyclesUseCase {
  constructor(private linkRepo: ClientMotorcycleRepository) {}

  async execute(): Promise<ClientMotorcycleEntity[]> {
    return await this.linkRepo.findAll();
  }
}
