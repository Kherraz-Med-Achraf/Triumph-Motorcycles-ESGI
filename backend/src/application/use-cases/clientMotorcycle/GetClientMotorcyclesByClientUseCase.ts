import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleEntity } from "../../../domain/entities/ClientMotorcycleEntity";
import { ClientNotFoundException } from "../../../domain/exceptions/client/ClientNotFoundException";
import { ClientMotorcycleNotFoundException } from "../../../domain/exceptions/clientMotorcycle/ClientMotorcycleNotFoundException"; 
import { ClientRepository } from "../../../domain/repositories/ClientRepository";

export class GetClientMotorcyclesByClientUseCase {
  constructor(
    private linkRepo: ClientMotorcycleRepository,
    private clientRepo: ClientRepository
  ) {}

  async execute(clientId: string): Promise<ClientMotorcycleEntity[]> {
    const clientExists = await this.clientRepo.findById(clientId);
    if (!clientExists) {
      throw new ClientNotFoundException();
    }

    const motorcycles = await this.linkRepo.findAllByClient(clientId);

    if (motorcycles.length === 0) {
      throw new ClientMotorcycleNotFoundException();
    }

    return motorcycles;
  }
}
