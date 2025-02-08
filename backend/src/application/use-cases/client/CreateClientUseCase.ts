import { v4 as uuidv4 } from "uuid";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateClientDTO, CreateClientSchema } from "./CreateClientDTO";
import { ClientEntity } from "../../../domain/entities/ClientEntity";
import { UserNotFoundException } from "../../../domain/exceptions/user/UserNotFoundException";
import { InvalidUserRoleException } from "../../../domain/exceptions/user/InvalidUserRoleException";
import { ClientAlreadyExistsException } from "../../../domain/exceptions/client/ClientAlreadyExistsException";

export class CreateClientUseCase {
  constructor(
    private clientRepo: ClientRepository,
    private userRepo: UserRepository 
  ) {}

  async execute(input: CreateClientDTO): Promise<ClientEntity> {

    const dto = CreateClientSchema.parse(input);

    // Vérifier si l'utilisateur existe
    const user = await this.userRepo.findById(dto.userId);
    if (!user) {
      throw new UserNotFoundException();
    }

    // Vérifier si l'utilisateur a bien le rôle CLIENT
    if (user.role !== "CLIENT") {
      throw new InvalidUserRoleException();
    }

    // Vérifier si un client existe déjà avec ce userId (éviter doublon)
    const existingClient = await this.clientRepo.findByUserId(dto.userId);
    if (existingClient) {
      throw new ClientAlreadyExistsException();
    }


    const clientId = uuidv4();

    let licenseExpDate: Date | undefined;
    if (dto.licenseExpiration) {
      licenseExpDate = new Date(dto.licenseExpiration);
    }

    const client = new ClientEntity(
      clientId,
      dto.userId,
      dto.address,
      licenseExpDate,
      dto.licenseCountry,
      dto.licenseNumber
    );

    return await this.clientRepo.create(client);
  }
}
