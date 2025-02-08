import { TrialRepository } from "../../../domain/repositories/TrialRepository";
import { TrialNotFoundException } from "../../../domain/exceptions/trial/TrialNotFoundException";

export class DeleteTrialUseCase {
  constructor(private trialRepo: TrialRepository) {}

  async execute(trialId: string): Promise<void> {
    const existing = await this.trialRepo.findById(trialId);
    if (!existing) {
      throw new TrialNotFoundException();
    }
    await this.trialRepo.delete(trialId);
  }
}
