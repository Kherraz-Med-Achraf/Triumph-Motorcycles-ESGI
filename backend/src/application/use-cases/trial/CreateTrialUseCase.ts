import { v4 as uuidv4 } from "uuid";
import { CreateTrialDTO, CreateTrialSchema } from "./CreateTrialDTO";
import { TrialRepository } from "../../../domain/repositories/TrialRepository";
import { TrialEntity } from "../../../domain/entities/TrialEntity";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { ClientNotFoundException } from "../../../domain/exceptions/client/ClientNotFoundException";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";
import { ActiveTrialAlreadyExistsException } from "../../../domain/exceptions/trial/ActiveTrialAlreadyExistsException";

export class CreateTrialUseCase {
  constructor(
    private trialRepo: TrialRepository,
    private clientRepo: ClientRepository,
    private motorcycleRepo: MotorcycleRepository
  ) {}

  async execute(input: CreateTrialDTO): Promise<TrialEntity> {
    const dto = CreateTrialSchema.parse(input);

    const clientExists = await this.clientRepo.findById(dto.clientId);
    if (!clientExists) {
      throw new ClientNotFoundException();
    }

    const motorcycleExists = await this.motorcycleRepo.findById(dto.motorcycleId);
    if (!motorcycleExists) {
      throw new MotorcycleNotFoundException();
    }

    
    const existingTrial = await this.trialRepo.findActiveTrial(dto.clientId, dto.motorcycleId);
    if (existingTrial) {
      throw new ActiveTrialAlreadyExistsException();
    }

    const id = uuidv4();
    const start = dto.startDate ? new Date(dto.startDate) : new Date();
    const end = dto.endDate ? new Date(dto.endDate) : undefined;

    const trial = new TrialEntity(
      id,
      dto.clientId,
      dto.motorcycleId,
      start,
      end
    );

    return await this.trialRepo.create(trial);
  }
}
