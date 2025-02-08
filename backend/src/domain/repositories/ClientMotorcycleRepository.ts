import { ClientMotorcycleEntity } from "../entities/ClientMotorcycleEntity";

export interface ClientMotorcycleRepository {
  create(link: ClientMotorcycleEntity): Promise<ClientMotorcycleEntity>;
  findById(id: string): Promise<ClientMotorcycleEntity | null>;
  findAllByClient(clientId: string): Promise<ClientMotorcycleEntity[]>;
  findByClientAndMotorcycle(clientId: string, motorcycleId: string): Promise<ClientMotorcycleEntity | null>;
  findAll(): Promise<ClientMotorcycleEntity[]>;
  update(link: ClientMotorcycleEntity): Promise<ClientMotorcycleEntity>;
  delete(id: string): Promise<void>;
}
