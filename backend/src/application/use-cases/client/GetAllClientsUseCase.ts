import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { ClientEntity } from "../../../domain/entities/ClientEntity";

export class GetAllClientsUseCase {
  constructor(private clientRepo: ClientRepository) {}

  async execute(): Promise<ClientEntity[]> {
    return await this.clientRepo.findAll();
  }
}
