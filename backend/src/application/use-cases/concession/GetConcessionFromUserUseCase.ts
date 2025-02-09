import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";

export class GetConcessionFromUserUseCase {
  constructor(
    private concessionRepo: ConcessionRepository,
    private userRepo: UserRepository
  ) {}

  async execute(userId: string): Promise<ConcessionEntity> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const concession = await this.concessionRepo.findByUserId(userId);
    if (!concession) {
      throw new ConcessionNotFoundException();
    }

    return concession;
  }
}
