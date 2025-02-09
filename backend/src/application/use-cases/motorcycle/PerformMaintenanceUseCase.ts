import {
  PerformMaintenanceSchema,
  PerformMaintenanceDTO,
} from "./PerformMaintenanceDTO";
import { IntervalRepository } from "../../../domain/repositories/IntervalRepository";
import { IntervalNotFoundException } from "../../../domain/exceptions/motorcycle/IntervalNotFoundException";
import { IntervalEntity } from "../../../domain/entities/IntervalEntity";

export class PerformMaintenanceUseCase {
  constructor(private intervalRepo: IntervalRepository) {}

  async execute(input: PerformMaintenanceDTO): Promise<void> {
    const dto = PerformMaintenanceSchema.parse(input);

    
    const intervals = await this.intervalRepo.findAllByMotorcycle(
      dto.motorcycleId
    );
    if (!intervals || intervals.length === 0) {
      throw new IntervalNotFoundException();
    }

    for (const interval of intervals) {
    
      switch (interval.type) {
        case "TIME": {
          if (dto.currentDate === undefined) {
            throw new Error(
              "Le champ 'currentDAte' est requis pour une maintenance de type 'TIME'"
            );
          }
          const updated = new IntervalEntity(
            interval.id,
            interval.type,
            interval.value,
            interval.motorcycleId,
            interval.lastMileage,
            new Date(dto.currentDate), 
            interval.createdAt
          );
          await this.intervalRepo.update(updated);
          break;
        }

        case "KM": {
          if (dto.currentMileage === undefined) {
            throw new Error(
              "Le champ 'currentMileage' est requis pour une maintenance de type 'KM'"
            );
          }

          const updated = new IntervalEntity(
            interval.id,
            interval.type,
            interval.value,
            interval.motorcycleId,
            dto.currentMileage, 
            interval.lastMaintenanceDate, 
            interval.createdAt
          );
          await this.intervalRepo.update(updated);
          break;
        }

        default:
          break;
      }
    }
  }
}
