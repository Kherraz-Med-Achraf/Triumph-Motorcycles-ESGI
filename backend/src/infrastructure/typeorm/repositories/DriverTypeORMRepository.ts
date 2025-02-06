// src/infrastructure/typeorm/repositories/DriverTypeORMRepository.ts
import { Repository } from "typeorm";
import { DriverRepository } from "../../../domain/repositories/DriverRepository";
import { DriverEntity, DriverExperience } from "../../../domain/entities/DriverEntity";
import { DriverTypeORMEntity } from "../entities/DriverTypeORMEntity";

export class DriverTypeORMRepository implements DriverRepository {
  constructor(private ormRepo: Repository<DriverTypeORMEntity>) {}

  async create(driver: DriverEntity): Promise<DriverEntity> {
    const entity = new DriverTypeORMEntity();
    entity.id = driver.id;
    entity.userId = driver.userId;
    entity.experience = driver.experience || null;
    entity.licenseExpiration = driver.licenseExpiration || null;
    entity.licenseCountry = driver.licenseCountry || null;
    entity.licenseNumber = driver.licenseNumber || null;
    entity.companyId = driver.companyId || null;
    entity.companyMotorcycleId = driver.companyMotorcycleId || null;

    await this.ormRepo.save(entity);
    return driver;
  }

  async findById(id: string): Promise<DriverEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new DriverEntity(
      entity.id,
      entity.userId,
      entity.experience as DriverExperience || undefined,
      entity.licenseExpiration || undefined,
      entity.licenseCountry || undefined,
      entity.licenseNumber || undefined,
      entity.companyId || undefined,
      entity.companyMotorcycleId || undefined
    );
  }

  async findByUserId(userId: string): Promise<DriverEntity | null> {
    const entity = await this.ormRepo.findOneBy({ userId });
    if (!entity) return null;

    return new DriverEntity(
      entity.id,
      entity.userId,
      entity.experience as DriverExperience || undefined,
      entity.licenseExpiration || undefined,
      entity.licenseCountry || undefined,
      entity.licenseNumber || undefined,
      entity.companyId || undefined,
      entity.companyMotorcycleId || undefined
    );
  }

  async update(driver: DriverEntity): Promise<DriverEntity> {
    const entity = new DriverTypeORMEntity();
    entity.id = driver.id;
    entity.userId = driver.userId;
    entity.experience = driver.experience || null;
    entity.licenseExpiration = driver.licenseExpiration || null;
    entity.licenseCountry = driver.licenseCountry || null;
    entity.licenseNumber = driver.licenseNumber || null;
    entity.companyId = driver.companyId || null;
    entity.companyMotorcycleId = driver.companyMotorcycleId || null;

    await this.ormRepo.save(entity);
    return driver;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }
}
