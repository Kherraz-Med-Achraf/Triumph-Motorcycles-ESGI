import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";
import { ConcessionEntity } from "../../../domain/entities/ConcessionEntity";

export class GetConcessionUseCase {
  constructor(private concessionRepo: ConcessionRepository) {}

  async execute(concessionId: string): Promise<ConcessionEntity> {
    const existing = await this.concessionRepo.findById(concessionId);
    if (!existing) {
      throw new ConcessionNotFoundException();
    }
    return existing;
  }
}
