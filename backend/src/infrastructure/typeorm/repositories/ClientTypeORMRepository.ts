import { Repository } from "typeorm";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { ClientEntity } from "../../../domain/entities/ClientEntity";
import { ClientTypeORMEntity } from "../entities/ClientTypeORMEntity";

export class ClientTypeORMRepository implements ClientRepository {
  constructor(private ormRepo: Repository<ClientTypeORMEntity>) {}

  async create(client: ClientEntity): Promise<ClientEntity> {
    const entity = new ClientTypeORMEntity();
    entity.id = client.id;
    entity.userId = client.userId;
    entity.address = client.address ?? null;
    entity.licenseExpiration = client.licenseExpiration ?? null;
    entity.licenseCountry = client.licenseCountry ?? null;
    entity.licenseNumber = client.licenseNumber ?? null;

    await this.ormRepo.save(entity);
    return client;
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new ClientEntity(
      entity.id,
      entity.userId,
      entity.address ?? undefined,
      entity.licenseExpiration ?? undefined,
      entity.licenseCountry ?? undefined,
      entity.licenseNumber ?? undefined
    );
  }

  async findByUserId(userId: string): Promise<ClientEntity | null> {
    const entity = await this.ormRepo.findOneBy({ userId });
    if (!entity) return null;

    return new ClientEntity(
      entity.id,
      entity.userId,
      entity.address ?? undefined,
      entity.licenseExpiration ?? undefined,
      entity.licenseCountry ?? undefined,
      entity.licenseNumber ?? undefined
    );
  }

  async findAll(): Promise<ClientEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => new ClientEntity(
      ent.id,
      ent.userId,
      ent.address ?? undefined,
      ent.licenseExpiration ?? undefined,
      ent.licenseCountry ?? undefined,
      ent.licenseNumber ?? undefined
    ));
  }

  async update(client: ClientEntity): Promise<ClientEntity> {
    const entity = new ClientTypeORMEntity();
    entity.id = client.id;
    entity.userId = client.userId;
    entity.address = client.address ?? null;
    entity.licenseExpiration = client.licenseExpiration ?? null;
    entity.licenseCountry = client.licenseCountry ?? null;
    entity.licenseNumber = client.licenseNumber ?? null;

    await this.ormRepo.save(entity);
    return client;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
