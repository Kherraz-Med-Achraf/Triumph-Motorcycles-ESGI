import { UserRepository } from "../../../domain/repositories/UserRepository";
import { DriverRepository } from "../../../domain/repositories/DriverRepository";
import { UserEntity } from "../../../domain/entities/UserEntity";
import { DriverEntity } from "../../../domain/entities/DriverEntity";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { DriverNotFoundException } from "../../../domain/exceptions/user/DriverNotFoundException";


export class GetUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private driverRepo: DriverRepository
  ) {}

  /**
   * @param userId Identifiant de l'utilisateur
   */
  async execute(
    userId: string
  ): Promise<UserEntity & { driver?: DriverEntity }> {
    const user = await this.userRepo.findById(userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    const result: UserEntity & { driver?: DriverEntity } = { ...user };

    // Si l'utilisateur est un DRIVER, on cherche son entité associée
    if (user.role === "DRIVER") {
      const driver = await this.driverRepo.findByUserId(userId);
      if (driver) {
        result.driver = driver;
      } else {
        throw new DriverNotFoundException();
      }
    }
    return result;
  }
}
