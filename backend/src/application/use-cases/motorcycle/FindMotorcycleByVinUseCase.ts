import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";

export class FindMotorcycleByVinUseCase {
  constructor(private motoRepo: MotorcycleRepository) {}

  async execute(vin: string): Promise<MotorcycleEntity> {
    const existing = await this.motoRepo.findByVin(vin);
    if (!existing) {
      throw new MotorcycleNotFoundException();
    }
    return existing;
  }
}
