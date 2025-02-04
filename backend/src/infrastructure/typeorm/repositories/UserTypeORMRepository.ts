import { Repository } from "typeorm";
import {
  UserEntity,
  UserRole,
  UserExperience,
} from "../../../domain/entities/UserEntity";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserTypeORMEntity } from "../entities/UserTypeORMEntity";

export class UserTypeORMRepository implements UserRepository {
  constructor(private ormRepo: Repository<UserTypeORMEntity>) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const entity = new UserTypeORMEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.role = user.role;

    entity.nom = user.nom;
    entity.prenom = user.prenom;

    entity.motorcycleId = user.motorcycleId ?? null;
    entity.licenseExpiration = user.licenseExpiration ?? null;
    entity.licenseCountry = user.licenseCountry ?? null;
    entity.licenseNumber = user.licenseNumber ?? null;
    entity.experience = user.experience ?? null;
    entity.address = user.address ?? null;

    entity.createdAt = user.createdAt;

    await this.ormRepo.save(entity);
    return user;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;

    return new UserEntity(
      entity.id,
      entity.email,
      entity.password,
      entity.role as UserRole,
      entity.nom,
      entity.prenom,
      entity.motorcycleId ?? undefined,
      entity.licenseExpiration ?? undefined,
      entity.licenseCountry ?? undefined,
      entity.licenseNumber ?? undefined,
      entity.experience ? (entity.experience as UserExperience) : undefined,
      entity.address ?? undefined,
      entity.createdAt
    );
  }

  async findAll(): Promise<UserEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map((entity) => {
      return new UserEntity(
        entity.id,
        entity.email,
        entity.password,
        entity.role as UserRole,
        entity.nom,
        entity.prenom,
        entity.motorcycleId ?? undefined,
        entity.licenseExpiration ?? undefined,
        entity.licenseCountry ?? undefined,
        entity.licenseNumber ?? undefined,
        entity.experience ? (entity.experience as UserExperience) : undefined,
        entity.address ?? undefined,
        entity.createdAt
      );
    });
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const entity = new UserTypeORMEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.role = user.role;

    entity.nom = user.nom;
    entity.prenom = user.prenom;

    entity.motorcycleId = user.motorcycleId ?? null;
    entity.licenseExpiration = user.licenseExpiration ?? null;
    entity.licenseCountry = user.licenseCountry ?? null;
    entity.licenseNumber = user.licenseNumber ?? null;
    entity.experience = user.experience ?? null;
    entity.address = user.address ?? null;

    entity.createdAt = user.createdAt;

    await this.ormRepo.save(entity);
    return user;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepo.delete(id);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = await this.ormRepo.findOneBy({ email });
    if (!entity) return null;

    return new UserEntity(
      entity.id,
      entity.email,
      entity.password,
      entity.role as UserRole,
      entity.nom,
      entity.prenom,
      entity.motorcycleId ?? undefined,
      entity.licenseExpiration ?? undefined,
      entity.licenseCountry ?? undefined,
      entity.licenseNumber ?? undefined,
      entity.experience ? (entity.experience as UserExperience) : undefined,
      entity.address ?? undefined,
      entity.createdAt
    );
  }
}
