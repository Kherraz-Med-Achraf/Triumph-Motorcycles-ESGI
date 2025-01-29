import { Repository } from 'typeorm';
import { UserEntity } from '../../../domain/entities/UserEntity';
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

  async findByEmail(email: string): Promise<UserEntity | null> {
    const entity = await this.ormRepo.findOneBy({ email });
    if (!entity) return null;
    return new UserEntity(entity.id, entity.email, entity.password, entity.role as any, entity.createdAt);
  }

  async findById(id: string): Promise<UserEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return new UserEntity(entity.id, entity.email, entity.password, entity.role as any, entity.createdAt);
  }

  async update(user: UserEntity): Promise<UserEntity> {
    // On fait la même logique de mapping
    const entity = new UserTypeORMEntity();
    entity.id = user.id;
    entity.email = user.email;
    entity.password = user.password;
    entity.role = user.role;
    entity.createdAt = user.createdAt;

    await this.ormRepo.save(entity);
    return user;
  }
}
