import {
  CheckMaintenanceDTO,
  CheckMaintenanceSchema,
} from "./CheckMaintenanceDTO";
import { IntervalRepository } from "../../../domain/repositories/IntervalRepository";
import { IntervalEntity } from "../../../domain/entities/IntervalEntity";
import { IntervalNotFoundException } from "../../../domain/exceptions/motorcycle/IntervalNotFoundException";

export class CheckMaintenanceDueUseCase {
  constructor(private intervalRepo: IntervalRepository) {}

  async execute(
    input: CheckMaintenanceDTO
  ): Promise<{ due: boolean; message: string }> {
    const dto = CheckMaintenanceSchema.parse(input);

    const intervals = await this.intervalRepo.findAllByMotorcycle(
      dto.motorcycleId
    );
    if (!intervals || intervals.length === 0) {
      throw new IntervalNotFoundException(  
      );
    }
    const interval = intervals[0];

    switch (interval.type) {
      case "KM": {
        if (dto.currentMileage === undefined) {
          return {
            due: false,
            message:
              "currentMileage non fourni, impossible de comparer l'interval KM.",
          };
        }
        const distanceSinceLastMaint =
          dto.currentMileage - interval.lastMileage;
        if (distanceSinceLastMaint >= interval.value) {
          return {
            due: true,
            message:
              "Maintenance due ( le km est dépassés depuis la dernière maintenance)",
          };
        } else {
          return {
            due: false,
            message: `Encore ${
              interval.value - distanceSinceLastMaint
            } km avant maintenance.`,
          };
        }
      }
      case "TIME": {
        if (!dto.currentDate) {
          return {
            due: false,
            message:
              "currentDate non fourni, impossible de comparer l'interval TIME.",
          };
        }
        const now = new Date(dto.currentDate);

        const monthsDiff = this.monthsBetween(
          now,
          new Date(interval.lastMaintenanceDate) 
        );
        

        if (monthsDiff >= interval.value) {
          return {
            due: true,
            message: `Maintenance due: ${monthsDiff} mois écoulés >= ${interval.value}`,
          };
        } else {
          return {
            due: false,
            message: `${monthsDiff} mois écoulés, encore temps`,
          };
        }
      }

      default:
        return { due: false, message: "Type d'interval inconnu" };
    }
  }

  private monthsBetween(date1: Date, date2: Date): number {
    const diffYears = date1.getFullYear() - date2.getFullYear();
    const diffMonths = date1.getMonth() - date2.getMonth();
    return diffYears * 12 + diffMonths;
  }
}
