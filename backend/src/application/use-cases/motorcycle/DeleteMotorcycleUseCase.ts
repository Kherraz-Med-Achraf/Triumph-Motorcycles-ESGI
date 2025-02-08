import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";

export class DeleteMotorcycleUseCase {
  constructor(private motoRepo: MotorcycleRepository) {}

  async execute(motoId: string): Promise<void> {
    const existing = await this.motoRepo.findById(motoId);
    if (!existing) {
      throw new MotorcycleNotFoundException();
    }
    await this.motoRepo.delete(motoId);
  }
}
