import { ConcessionRepository } from "../../../domain/repositories/ConcessionRepository";
import { ConcessionNotFoundException } from "../../../domain/exceptions/concession/ConcessionNotFoundException";

export class DeleteConcessionUseCase {
  constructor(private concessionRepo: ConcessionRepository) {}

  async execute(concessionId: string): Promise<void> {
    const existing = await this.concessionRepo.findById(concessionId);
    if (!existing) {
      throw new ConcessionNotFoundException();
    }

    await this.concessionRepo.delete(concessionId);
  }
}
