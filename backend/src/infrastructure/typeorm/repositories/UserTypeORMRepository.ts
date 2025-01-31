import { Repository } from 'typeorm';
import { UserEntity, UserRole } from '../../../domain/entities/UserEntity';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UserTypeORMEntity } from '../entities/UserTypeORMEntity';

export class UserTypeORMRepository implements UserRepository {
  constructor(private ormRepo: Repository<UserTypeORMEntity>) {}

  async create(user: UserEntity): Promise<UserEntity> {
    const entity = new UserTypeORMEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.role = user.role;
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
      entity.role as any,
      entity.createdAt
    );
  }

  async findAll(): Promise<UserEntity[]> {
    const entities = await this.ormRepo.find();
    return entities.map(entity => 
      new UserEntity(
        entity.id,
        entity.email,
        entity.password, 
        entity.role as UserRole,
        entity.createdAt
      )
    );
  }

  async update(user: UserEntity): Promise<UserEntity> {
    const entity = new UserTypeORMEntity();
    entity.id = user.id;
    entity.email = user.email; 
    entity.password = user.password;
    entity.role = user.role;
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
      entity.createdAt
    );
  }
}