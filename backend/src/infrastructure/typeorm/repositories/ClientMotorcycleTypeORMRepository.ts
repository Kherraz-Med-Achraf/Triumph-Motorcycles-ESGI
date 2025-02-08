import { Repository } from "typeorm";
import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleEntity } from "../../../domain/entities/ClientMotorcycleEntity";
import { ClientMotorcycleTypeORMEntity } from "../entities/ClientMotorcycleTypeORMEntity";

export class ClientMotorcycleTypeORMRepository implements ClientMotorcycleRepository {
  constructor(private ormRepo: Repository<ClientMotorcycleTypeORMEntity>) {}

  async create(link: ClientMotorcycleEntity): Promise<ClientMotorcycleEntity> {
    const entity = new ClientMotorcycleTypeORMEntity();
    entity.id = link.id;
    entity.clientId = link.clientId;
    entity.motorcycleId = link.motorcycleId;
    entity.assignedAt = link.assignedAt;
    entity.createdAt = link.createdAt;

    await this.ormRepo.save(entity);
    return link;
  }

  async findById(id: string): Promise<ClientMotorcycleEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new ClientMotorcycleEntity(
      entity.id,
      entity.clientId,
      entity.motorcycleId,
      entity.assignedAt,
      entity.createdAt
    );
  }

  async findAllByClient(clientId: string): Promise<ClientMotorcycleEntity[]> {
    const entities = await this.ormRepo.findBy({ clientId });
    return entities.map(ent => new ClientMotorcycleEntity(
      ent.id,
      ent.clientId,
      ent.motorcycleId,
      ent.assignedAt,
      ent.createdAt
    ));
  }

  async findByClientAndMotorcycle(clientId: string, motorcycleId: string): Promise<ClientMotorcycleEntity | null> {
    const entity = await this.ormRepo.findOne({ where: { clientId, motorcycleId } });
    if (!entity) return null;
  
    return new ClientMotorcycleEntity(
      entity.id,
      entity.clientId,
      entity.motorcycleId,
      entity.assignedAt
    );
  }
  

  async findAll(): Promise<ClientMotorcycleEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => new ClientMotorcycleEntity(
      ent.id,
      ent.clientId,
      ent.motorcycleId,
      ent.assignedAt,
      ent.createdAt
    ));
  }

  async update(link: ClientMotorcycleEntity): Promise<ClientMotorcycleEntity> {
    const entity = new ClientMotorcycleTypeORMEntity();
    entity.id = link.id;
    entity.clientId = link.clientId;
    entity.motorcycleId = link.motorcycleId;
    entity.assignedAt = link.assignedAt;
    entity.createdAt = link.createdAt;

    await this.ormRepo.save(entity);
    return link;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
