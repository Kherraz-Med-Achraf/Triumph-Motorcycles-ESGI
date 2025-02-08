import { v4 as uuidv4 } from "uuid";
import { CreateMotorcycleDTO, CreateMotorcycleSchema } from "./CreateMotorcycleDTO";
import { MotorcycleEntity } from "../../../domain/entities/MotorcycleEntity";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { VinAlreadyExistsException } from "../../../domain/exceptions/motorcycle/VinAlreadyExistsException";

export class CreateMotorcycleUseCase {
  constructor(private motoRepo: MotorcycleRepository) {}

  async execute(input: CreateMotorcycleDTO): Promise<MotorcycleEntity> {

    const dto = CreateMotorcycleSchema.parse(input);

    const existingMoto = await this.motoRepo.findByVin(dto.vin);
    if (existingMoto) {
      throw new VinAlreadyExistsException();
    }

    const concessionExists = await this.motoRepo.findAllByConcession(dto.concessionId);
    if (concessionExists.length === 0) {
      throw new ConcessionNotFoundException();
    }

    const newMoto = new MotorcycleEntity(
      uuidv4(),
      dto.vin,
      dto.model,
      dto.concessionId,
      new Date()
    );

    return await this.motoRepo.create(newMoto);
  }
}
