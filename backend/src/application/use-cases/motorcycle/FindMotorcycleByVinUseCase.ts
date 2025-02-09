import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { IntervalRepository } from "../../../domain/repositories/IntervalRepository";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";
import { MotorcycleWithIntervalDTO } from "../motorcycle/MotorcycleWithIntervalDTO"; 

export class FindMotorcycleByVinUseCase {
  constructor(
    private motoRepo: MotorcycleRepository,
    private intervalRepo: IntervalRepository
  ) {}

  async execute(vin: string): Promise<MotorcycleWithIntervalDTO> {
    const existing: MotorcycleEntity | null = await this.motoRepo.findByVin(vin);
    if (!existing) {
      throw new MotorcycleNotFoundException();
    }


    const intervals = await this.intervalRepo.findAllByMotorcycle(existing.id);
    let intervalType: string | undefined;
    let intervalValue: number | undefined;
    if (intervals.length > 0) {
      const interval = intervals[0];
      intervalType = interval.type;
      intervalValue = interval.value;
    }

    const motorcycleDTO: MotorcycleWithIntervalDTO = {
      id: existing.id,
      vin: existing.vin,
      model: existing.model,
      concessionId: existing.concessionId,
      createdAt: existing.createdAt,
      intervalType,
      intervalValue,
    };

    return motorcycleDTO;
  }
}
