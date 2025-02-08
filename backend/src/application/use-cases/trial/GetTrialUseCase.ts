import { TrialRepository } from "../../../domain/repositories/TrialRepository";
import { TrialEntity } from "../../../domain/entities/TrialEntity";
import { TrialNotFoundException } from "../../../domain/exceptions/trial/TrialNotFoundException";

export class GetTrialUseCase {
  constructor(private trialRepo: TrialRepository) {}

  async execute(trialId: string): Promise<TrialEntity> {
    const trial = await this.trialRepo.findById(trialId);
    if (!trial) {
      throw new TrialNotFoundException();
    }
    return trial;
  }
}
