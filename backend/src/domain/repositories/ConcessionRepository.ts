import { ConcessionEntity } from "../entities/ConcessionEntity";

export interface ConcessionRepository {
  create(concession: ConcessionEntity): Promise<ConcessionEntity>;
  findById(id: string): Promise<ConcessionEntity | null>;
  findByName(name: string): Promise<ConcessionEntity | null>;
  findAll(): Promise<ConcessionEntity[]>;
  findByUserId(userId: string): Promise<ConcessionEntity | null>;
  update(concession: ConcessionEntity): Promise<ConcessionEntity>;
  delete(id: string): Promise<void>;
}
