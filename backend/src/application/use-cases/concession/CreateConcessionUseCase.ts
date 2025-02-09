import { v4 as uuidv4 } from "uuid";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";
import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import {
  CreateConcessionDTO,
  CreateConcessionSchema,
} from "./CreateConcessionDTO";
import { ConcessionAlreadyExistsException } from "../../../domain/exceptions/concession/ConcessionAlreadyExistsException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { InvalidUserRoleException } from "../../../domain/exceptions/user/InvalidUserRoleException";

export class CreateConcessionUseCase {
  constructor(
    private concessionRepo: ConcessionRepository,
    private userRepo: UserRepository
  ) {}

  async execute(input: CreateConcessionDTO): Promise<ConcessionEntity> {
    // Validation du DTO
    const dto = CreateConcessionSchema.parse(input);

    const existingConcession = await this.concessionRepo.findByName(dto.name);
    if (existingConcession) {
      throw new ConcessionAlreadyExistsException();
    }

    let managerUserId: string | null = null;
    if (dto.managerUserId) {
      const user = await this.userRepo.findById(dto.managerUserId);
      if (!user) {
        throw new UserNotFoundException();
      }
      if (user.role !== "MANAGER_CONCESSION") {
        throw new InvalidUserRoleException();
      }
      managerUserId = dto.managerUserId;
    }

    const newId = uuidv4();

    const concession = new ConcessionEntity(
      newId,
      dto.name,
      managerUserId,
      dto.address,
      new Date()
    );
    return await this.concessionRepo.create(concession);
  }
}
