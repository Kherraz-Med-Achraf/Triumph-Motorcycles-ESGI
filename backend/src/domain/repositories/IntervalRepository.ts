import { IntervalEntity } from "../entities/IntervalEntity";

export interface IntervalRepository {
  create(interval: IntervalEntity): Promise<IntervalEntity>;
  findById(id: string): Promise<IntervalEntity | null>;
  findAll(): Promise<IntervalEntity[]>;
  findAllByMotorcycle(motorcycleId: string): Promise<IntervalEntity[]>;
  update(interval: IntervalEntity): Promise<IntervalEntity>;
  delete(id: string): Promise<void>;
}
