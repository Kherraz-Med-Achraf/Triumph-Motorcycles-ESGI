import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { ClientNotFoundException } from "../../../domain/exceptions/client/ClientNotFoundException";
import { ClientEntity } from "../../../domain/entities/ClientEntity";

export class GetClientUseCase {
  constructor(private clientRepo: ClientRepository) {}

  async execute(clientId: string): Promise<ClientEntity> {
    const existing = await this.clientRepo.findById(clientId);
    if (!existing) {
      throw new ClientNotFoundException();
    }
    return existing;
  }
}
