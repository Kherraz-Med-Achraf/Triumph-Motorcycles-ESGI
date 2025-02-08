import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { ClientNotFoundException } from "../../../domain/exceptions/client/ClientNotFoundException";

export class DeleteClientUseCase {
  constructor(private clientRepo: ClientRepository) {}

  async execute(clientId: string): Promise<void> {
    const existing = await this.clientRepo.findById(clientId);
    if (!existing) {
      throw new ClientNotFoundException();
    }
    await this.clientRepo.delete(clientId);
  }
}
