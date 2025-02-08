import { MotorcycleEntity } from "../entities/MotorcycleEntity";

export interface MotorcycleRepository {
  create(moto: MotorcycleEntity): Promise<MotorcycleEntity>;
  findById(id: string): Promise<MotorcycleEntity | null>;
  findAll(): Promise<MotorcycleEntity[]>;
  update(moto: MotorcycleEntity): Promise<MotorcycleEntity>;
  delete(id: string): Promise<void>;
  findAllByConcession(concessionId: string): Promise<MotorcycleEntity[]>;
  findByVin(vin: string): Promise<MotorcycleEntity | null>;
}
