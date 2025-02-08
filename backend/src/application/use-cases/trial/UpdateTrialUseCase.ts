import { UpdateTrialDTO, UpdateTrialSchema } from "./UpdateTrialDTO";
import { TrialRepository } from "../../../domain/repositories/TrialRepository";
import { TrialNotFoundException } from "../../../domain/exceptions/trial/TrialNotFoundException";
import { TrialEntity } from "../../../domain/entities/TrialEntity";

export class UpdateTrialUseCase {
  constructor(private trialRepo: TrialRepository) {}

  async execute(input: UpdateTrialDTO): Promise<TrialEntity> {
    const dto = UpdateTrialSchema.parse(input);

    const existing = await this.trialRepo.findById(dto.id);
    if (!existing) {
      throw new TrialNotFoundException();
    }

    const start = dto.startDate ? new Date(dto.startDate) : existing.startDate;
    const end = dto.endDate ? new Date(dto.endDate) : existing.endDate;

    const updated = new TrialEntity(
      existing.id,
      dto.clientId ?? existing.clientId,
      dto.motorcycleId ?? existing.motorcycleId,
      start,
      end,
      existing.createdAt
    );

    return await this.trialRepo.update(updated);
  }
}
