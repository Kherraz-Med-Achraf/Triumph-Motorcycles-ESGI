import { UpdateClientDTO, UpdateClientSchema } from "./UpdateClientDTO";
import { ClientRepository } from "../../../domain/repositories/ClientRepository";
import { ClientNotFoundException } from "../../../domain/exceptions/client/ClientNotFoundException";
import { ClientEntity } from "../../../domain/entities/ClientEntity";

export class UpdateClientUseCase {
  constructor(private clientRepo: ClientRepository) {}

  async execute(input: UpdateClientDTO): Promise<ClientEntity> {
    const dto = UpdateClientSchema.parse(input);

    const existing = await this.clientRepo.findById(dto.id);
    if (!existing) {
      throw new ClientNotFoundException();
    }

    let licenseExpDate: Date | undefined;
    if (dto.licenseExpiration) {
      licenseExpDate = new Date(dto.licenseExpiration);
    }

    const updatedClient = new ClientEntity(
      existing.id,
      existing.userId,
      dto.address ?? existing.address,
      licenseExpDate ?? existing.licenseExpiration,
      dto.licenseCountry ?? existing.licenseCountry,
      dto.licenseNumber ?? existing.licenseNumber
    );

    return await this.clientRepo.update(updatedClient);
  }
}
