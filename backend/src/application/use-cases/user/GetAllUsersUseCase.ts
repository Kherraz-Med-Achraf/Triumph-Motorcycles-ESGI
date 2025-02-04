import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserEntity } from "../../../domain/entities/UserEntity";

export class GetAllUsersUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepo.findAll();
  }
}
