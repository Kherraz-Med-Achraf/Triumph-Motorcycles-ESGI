import { Repository, IsNull } from "typeorm";
import { TrialRepository } from "../../../domain/repositories/TrialRepository";
import { TrialEntity } from "../../../domain/entities/TrialEntity";
import { TrialTypeORMEntity } from "../entities/TrialTypeORMEntity";

export class TrialTypeORMRepository implements TrialRepository {
  constructor(private ormRepo: Repository<TrialTypeORMEntity>) {}

  async create(trial: TrialEntity): Promise<TrialEntity> {
    const entity = new TrialTypeORMEntity();
    entity.id = trial.id;
    entity.clientId = trial.clientId;
    entity.motorcycleId = trial.motorcycleId;
    entity.startDate = trial.startDate;
    entity.endDate = trial.endDate ?? null;
    entity.createdAt = trial.createdAt;

    await this.ormRepo.save(entity);
    return trial;
  }

  async findById(id: string): Promise<TrialEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new TrialEntity(
      entity.id,
      entity.clientId,
      entity.motorcycleId,
      entity.startDate,
      entity.endDate ?? undefined,
      entity.createdAt
    );
  }

  async findActiveTrial(clientId: string, motorcycleId: string): Promise<TrialEntity | null> {
    const entity = await this.ormRepo.findOne({
      where: { clientId, motorcycleId, endDate: IsNull() }, 
    });
  
    if (!entity) return null;
  
    return new TrialEntity(
      entity.id,
      entity.clientId,
      entity.motorcycleId,
      entity.startDate,
      entity.endDate ?? undefined,
    );
  }

  async findAll(): Promise<TrialEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(ent => new TrialEntity(
      ent.id,
      ent.clientId,
      ent.motorcycleId,
      ent.startDate,
      ent.endDate ?? undefined,
      ent.createdAt
    ));
  }

  async findAllByClient(clientId: string): Promise<TrialEntity[]> {
    const entities = await this.ormRepo.findBy({ clientId });
    return entities.map(ent => new TrialEntity(
      ent.id,
      ent.clientId,
      ent.motorcycleId,
      ent.startDate,
      ent.endDate ?? undefined,
      ent.createdAt
    ));
  }

  async update(trial: TrialEntity): Promise<TrialEntity> {
    const entity = new TrialTypeORMEntity();
    entity.id = trial.id;
    entity.clientId = trial.clientId;
    entity.motorcycleId = trial.motorcycleId;
    entity.startDate = trial.startDate;
    entity.endDate = trial.endDate ?? null;
    entity.createdAt = trial.createdAt;

    await this.ormRepo.save(entity);
    return trial;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
