import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";

export class GetAllConcessionsUseCase {
  constructor(private concessionRepo: ConcessionRepository) {}

  async execute(): Promise<ConcessionEntity[]> {
    return await this.concessionRepo.findAll();
  }
}
