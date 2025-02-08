import { v4 as uuidv4 } from "uuid";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";
import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateConcessionDTO, CreateConcessionSchema } from "./CreateConcessionDTO";
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

    // Vérifier si une concession avec ce nom existe déjà
    const existingConcession = await this.concessionRepo.findByName(dto.name);
    if (existingConcession) {
      throw new ConcessionAlreadyExistsException();
    }

    // Vérifier si l'utilisateur existe et a bien le rôle MANAGER_CONCESSION
    const user = await this.userRepo.findById(dto.managerUserId);
    if (!user) {
      throw new UserNotFoundException();
    }

    if (user.role !== "MANAGER_CONCESSION") {
      throw new InvalidUserRoleException();
    }

    const newId = uuidv4();

    const concession = new ConcessionEntity(
      newId,
      dto.name,
      dto.managerUserId,
      dto.address,
      new Date()
    );
    return await this.concessionRepo.create(concession);
  }
}
