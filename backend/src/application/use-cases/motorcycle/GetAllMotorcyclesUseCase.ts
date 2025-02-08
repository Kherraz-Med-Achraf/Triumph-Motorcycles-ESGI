import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";

export class GetAllMotorcyclesUseCase {
  constructor(private motoRepo: MotorcycleRepository) {}

  async execute(): Promise<MotorcycleEntity[]> {
    return await this.motoRepo.findAll();
  }
}
