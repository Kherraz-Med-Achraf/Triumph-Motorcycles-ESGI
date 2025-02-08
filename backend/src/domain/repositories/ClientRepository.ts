import { ClientEntity } from "../entities/ClientEntity";

export interface ClientRepository {
  create(client: ClientEntity): Promise<ClientEntity>;
  findById(id: string): Promise<ClientEntity | null>;
  findByUserId(userId: string): Promise<ClientEntity | null>;
  findAll(): Promise<ClientEntity[]>;
  update(client: ClientEntity): Promise<ClientEntity>;
  delete(id: string): Promise<void>;
}
