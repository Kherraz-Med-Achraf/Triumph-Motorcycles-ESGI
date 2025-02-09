import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UpdateConcessionDTO, UpdateConcessionSchema } from "./UpdateConcessionDTO";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { InvalidUserRoleException } from "../../../domain/exceptions/user/InvalidUserRoleException";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";
import { ConcessionUpdateFailedException } from "../../../domain/exceptions/concession/ConcessionUpdateFailedException";

export class UpdateConcessionUseCase {
  constructor(
    private concessionRepo: ConcessionRepository,
    private userRepo: UserRepository
  ) {}

  async execute(input: UpdateConcessionDTO): Promise<ConcessionEntity> {
    const dto = UpdateConcessionSchema.parse(input);

    
    const existingConcession = await this.concessionRepo.findById(dto.id);
    if (!existingConcession) {
      throw new ConcessionNotFoundException();
    }

    let newManagerUserId = existingConcession.managerUserId;
    if (dto.managerUserId !== undefined) {
      if (dto.managerUserId === null) {
        newManagerUserId = null;
      } else {
        const user = await this.userRepo.findById(dto.managerUserId);
        if (!user) {
          throw new UserNotFoundException();
        }
        if (user.role !== "MANAGER_CONCESSION") {
          throw new InvalidUserRoleException();
        }
        newManagerUserId = dto.managerUserId;
      }
    }


    const updatedConcession = new ConcessionEntity(
      existingConcession.id,
      dto.name ?? existingConcession.name,
      newManagerUserId,
      dto.address ?? existingConcession.address,
      existingConcession.createdAt
    );

    const result = await this.concessionRepo.update(updatedConcession);
    if (!result) {
      throw new ConcessionUpdateFailedException();
    }

    return result;
  }
}
