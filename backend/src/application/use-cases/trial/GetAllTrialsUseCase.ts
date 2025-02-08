import { TrialRepository } from "../../../domain/repositories/TrialRepository";
import { TrialEntity } from "../../../domain/entities/TrialEntity";

export class GetAllTrialsUseCase {
  constructor(private trialRepo: TrialRepository) {}

  async execute(): Promise<TrialEntity[]> {
    return await this.trialRepo.findAll();
  }
}
