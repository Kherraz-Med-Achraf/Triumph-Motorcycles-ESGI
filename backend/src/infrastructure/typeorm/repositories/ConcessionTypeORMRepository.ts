import { Repository } from 'typeorm';
import { ConcessionEntity } from '../../../domain/entities/ConcessionEntity';
import { ConcessionRepository } from '../../../domain/repositories/ConcessionRepository';
import { ConcessionTypeORMEntity } from '../entities/ConcessionTypeORMEntity';

export class ConcessionTypeORMRepository implements ConcessionRepository {
  constructor(private ormRepo: Repository<ConcessionTypeORMEntity>) {}

  async create(concession: ConcessionEntity): Promise<ConcessionEntity> {
    const entity = new ConcessionTypeORMEntity();
    entity.id = concession.id;
    entity.name = concession.name;
    entity.managerId = concession.managerId;

    await this.ormRepo.save(entity);
    return concession;
  }

  async findById(id: string): Promise<ConcessionEntity | null> {
    const entity = await this.ormRepo.findOneBy({ id });
    if (!entity) return null;
    return new ConcessionEntity(entity.id, entity.name, entity.managerId);
  }

  async update(concession: ConcessionEntity): Promise<ConcessionEntity> {
    const entity = new ConcessionTypeORMEntity();
    entity.id = concession.id;
    entity.name = concession.name;
    entity.managerId = concession.managerId;

    await this.ormRepo.save(entity);
    return concession;
  }
}
