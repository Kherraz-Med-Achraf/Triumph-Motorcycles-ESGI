import { DriverEntity } from "../entities/DriverEntity";

export interface DriverRepository {
  create(driver: DriverEntity): Promise<DriverEntity>;
  findById(id: string): Promise<DriverEntity | null>;
  findByUserId(userId: string): Promise<DriverEntity | null>;
  update(driver: DriverEntity): Promise<DriverEntity>;
  delete(id: string): Promise<void>;
}
