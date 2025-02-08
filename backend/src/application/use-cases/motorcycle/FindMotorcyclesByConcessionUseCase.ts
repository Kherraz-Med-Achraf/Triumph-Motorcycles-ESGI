import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";

export class FindMotorcyclesByConcessionUseCase {
  constructor(private motoRepo: MotorcycleRepository) {}

  async execute(concessionId: string): Promise<MotorcycleEntity[]> {
    return await this.motoRepo.findAllByConcession(concessionId);
  }
}
