import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";


export class DeleteUserUseCase {
  constructor(private userRepo: UserRepository) {}

  /**
   * @param userId 
   */
  async execute(userId: string): Promise<void> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }
    await this.userRepo.delete(userId);
  }
}
