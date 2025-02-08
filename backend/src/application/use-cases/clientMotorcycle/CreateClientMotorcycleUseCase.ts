import { v4 as uuidv4 } from "uuid";
import { CreateClientMotorcycleDTO, CreateClientMotorcycleSchema } from "./CreateClientMotorcycleDTO";
import { ClientMotorcycleRepository } from "../../../domain/repositories/ClientMotorcycleRepository";
import { ClientMotorcycleEntity } from "../../../domain/entities/ClientMotorcycleEntity";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { MotorcycleRepository } from "../../../domain/repositories/MotorcycleRepository";
import { ClientNotFoundException } from "../../../domain/exceptions/client/ClientNotFoundException";
import { MotorcycleNotFoundException } from "../../../domain/exceptions/motorcycle/MotorcycleNotFoundException";
import { ClientMotorcycleNotFoundException } from "../../../domain/exceptions/clientMotorcycle/ClientMotorcycleNotFoundException";

export class CreateClientMotorcycleUseCase {
  constructor(
    private linkRepo: ClientMotorcycleRepository,
    private clientRepo: ClientRepository,
    private motorcycleRepo: MotorcycleRepository
  ) {}

  async execute(input: CreateClientMotorcycleDTO): Promise<ClientMotorcycleEntity> {

    const dto = CreateClientMotorcycleSchema.parse(input);

    const clientExists = await this.clientRepo.findById(dto.clientId);
    if (!clientExists) {
      throw new ClientNotFoundException();
    }


    const motorcycleExists = await this.motorcycleRepo.findById(dto.motorcycleId);
    if (!motorcycleExists) {
      throw new MotorcycleNotFoundException();
    }


    const existingLink = await this.linkRepo.findByClientAndMotorcycle(dto.clientId, dto.motorcycleId);
    if (existingLink) {
      throw new ClientMotorcycleNotFoundException();
    }


    const linkId = uuidv4();
    const assigned = dto.assignedAt ? new Date(dto.assignedAt) : new Date();

    const link = new ClientMotorcycleEntity(
      linkId,
      dto.clientId,
      dto.motorcycleId,
      assigned
    );

    return await this.linkRepo.create(link);
  }
}
