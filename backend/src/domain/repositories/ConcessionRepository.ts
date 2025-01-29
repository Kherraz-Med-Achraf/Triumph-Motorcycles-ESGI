import { ConcessionEntity } from "../entities/ConcessionEntity";

export interface ConcessionRepository {
  create(concession: ConcessionEntity): Promise<ConcessionEntity>;
  findById(id: string): Promise<ConcessionEntity | null>;
  update(concession: ConcessionEntity): Promise<ConcessionEntity>;
}
