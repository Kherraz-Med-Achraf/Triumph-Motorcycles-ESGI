import { Repository } from "typeorm";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { MotorcycleTypeORMEntity } from "../entities/MotorcycleTypeORMEntity";

export class MotorcycleTypeORMRepository implements MotorcycleRepository {
  constructor(private ormRepo: Repository<MotorcycleTypeORMEntity>) {}

  async create(moto: MotorcycleEntity): Promise<MotorcycleEntity> {
    const entity = new MotorcycleTypeORMEntity();
    entity.id = moto.id;
    entity.vin = moto.vin;
    entity.model = moto.model;
    entity.concessionId = moto.concessionId; 
    entity.createdAt = moto.createdAt;

    await this.ormRepo.save(entity);
    return moto;
  }

  async findById(id: string): Promise<MotorcycleEntity | null> {
    const entity = await this.ormRepo.findOne({
      where: { id },
      relations: ["concession"],
    });
    if (!entity) return null;

    return new MotorcycleEntity(
      entity.id,
      entity.vin,
      entity.model,
      entity.concessionId,
      entity.createdAt
    );
  }

  async findAll(): Promise<MotorcycleEntity[]> {
    const entities = await this.ormRepo.find({ relations: ["concession"] });
    return entities.map(ent =>
      new MotorcycleEntity(
        ent.id,
        ent.vin,
        ent.model,
        ent.concessionId,
        ent.createdAt
      )
    );
  }

  async findAllByConcession(concessionId: string): Promise<MotorcycleEntity[]> {
    const entities = await this.ormRepo.find({
      where: { concessionId },
      relations: ["concession"],
    });
    return entities.map(ent =>
      new MotorcycleEntity(
        ent.id,
        ent.vin,
        ent.model,
        ent.concessionId,
        ent.createdAt
      )
    );
  }

  async findByVin(vin: string): Promise<MotorcycleEntity | null> {
    const entity = await this.ormRepo.findOne({
      where: { vin },
      relations: ["concession"],
    });
    if (!entity) return null;

    return new MotorcycleEntity(
      entity.id,
      entity.vin,
      entity.model,
      entity.concessionId,
      entity.createdAt
    );
  }

  async update(moto: MotorcycleEntity): Promise<MotorcycleEntity> {
    const entity = await this.ormRepo.findOneBy({ id: moto.id });
    if (!entity) throw new Error("Motorcycle not found");

    entity.vin = moto.vin;
    entity.model = moto.model;
    entity.concessionId = moto.concessionId;
    entity.createdAt = moto.createdAt;

    await this.ormRepo.save(entity);
    return moto;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
