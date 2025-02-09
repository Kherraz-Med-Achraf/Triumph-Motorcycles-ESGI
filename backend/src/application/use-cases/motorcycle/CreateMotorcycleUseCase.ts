import { v4 as uuidv4 } from "uuid";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { IntervalRepository } from "../../../domain/repositories/IntervalRepository";
import { CreateMotorcycleDTO, CreateMotorcycleSchema } from "./CreateMotorcycleDTO";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";
import { IntervalEntity } from "../../../domain/entities/IntervalEntity";
import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { VinAlreadyExistsException } from "../../../domain/exceptions/motorcycle/VinAlreadyExistsException";

export class CreateMotorcycleUseCase {
  constructor(
    private motorcycleRepo: MotorcycleRepository,
    private intervalRepo: IntervalRepository,
    private concessionRepo: ConcessionRepository 
  ) {}

  async execute(input: CreateMotorcycleDTO): Promise<MotorcycleEntity> {
    const dto = CreateMotorcycleSchema.parse(input);

    
    const concessionExists = await this.concessionRepo.findById(dto.concessionId);
    if (!concessionExists) {
      throw new ConcessionNotFoundException();
    }

   
    const motoExists = await this.motorcycleRepo.findByVin(dto.vin);
    if (motoExists) {
      throw new VinAlreadyExistsException();
    }

   
    const motoId = uuidv4();
    const moto = new MotorcycleEntity(
      motoId,
      dto.vin,
      dto.model,
      dto.concessionId,
      new Date()
    );
    const createdMoto = await this.motorcycleRepo.create(moto);

    
    if (dto.intervalType && dto.intervalValue !== undefined) {
      const interval = new IntervalEntity(
        uuidv4(),
        dto.intervalType, 
        dto.intervalValue,
        motoId,
        0, 
        new Date()
      );
      await this.intervalRepo.create(interval);
    }

    return createdMoto;
  }
}
