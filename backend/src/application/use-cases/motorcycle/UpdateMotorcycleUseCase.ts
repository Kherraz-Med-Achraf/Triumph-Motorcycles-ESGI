import { UpdateMotorcycleDTO, UpdateMotorcycleSchema } from "./UpdateMotorcycleDTO";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { IntervalRepository } from "../../../domain/repositories/IntervalRepository";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";
import { IntervalEntity } from "../../../domain/entities/IntervalEntity";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";

export class UpdateMotorcycleUseCase {
  constructor(
    private motorcycleRepo: MotorcycleRepository,
    private intervalRepo: IntervalRepository
  ) {}

  async execute(input: UpdateMotorcycleDTO): Promise<MotorcycleEntity> {
    const dto = UpdateMotorcycleSchema.parse(input);

    const existingMoto = await this.motorcycleRepo.findById(dto.id);
    if (!existingMoto) {
      throw new MotorcycleNotFoundException();
    }

    const updatedMoto = new MotorcycleEntity(
      existingMoto.id,
      dto.vin ?? existingMoto.vin,
      dto.model ?? existingMoto.model,
      dto.concessionId ?? existingMoto.concessionId,
      existingMoto.createdAt
    );
    await this.motorcycleRepo.update(updatedMoto);

    if (dto.intervalType !== undefined && dto.intervalValue !== undefined) {
      const intervals = await this.intervalRepo.findAllByMotorcycle(updatedMoto.id);

      let intervalToUpdate = intervals[0]; 
      if (!intervalToUpdate) {
        intervalToUpdate = new IntervalEntity(
          `${updatedMoto.id}-interval`,
          dto.intervalType,
          dto.intervalValue,
          updatedMoto.id,
          0,             
          new Date()     
        );
        await this.intervalRepo.create(intervalToUpdate);
      } else {
        
        const newInterval = new IntervalEntity(
          intervalToUpdate.id,
          dto.intervalType,
          dto.intervalValue,
          intervalToUpdate.motorcycleId,
          intervalToUpdate.lastMileage,       
          intervalToUpdate.lastMaintenanceDate,   
          intervalToUpdate.createdAt             
        );
        await this.intervalRepo.update(newInterval);
      }
    }

    return updatedMoto;
  }
}
