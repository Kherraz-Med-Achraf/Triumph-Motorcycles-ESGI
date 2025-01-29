import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";
import { v4 as uuid } from "uuid";

export interface CreateConcessionDTO {
  name: string;
  managerUserId: string;
}

export class CreateConcessionUseCase {
  constructor(
    private concessionRepo: ConcessionRepository,
    private userRepo: UserRepository
  ) {}

  async execute(dto: CreateConcessionDTO): Promise<ConcessionEntity> {
    const manager = await this.userRepo.findById(dto.managerUserId);
    if (!manager) {
      throw new Error("Manager user does not exist");
    }
    if (manager.role !== "MANAGER_CONCESSION") {
      throw new Error("User is not a MANAGER_CONCESSION");
    }

    const concession = new ConcessionEntity(uuid(), dto.name, manager.id);
    return await this.concessionRepo.create(concession);
  }
}
