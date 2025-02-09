import { Provider } from "@nestjs/common";
import { CreateMotorcycleUseCase } from "../../../../application/use-cases/motorcycle/CreateMotorcycleUseCase";
import { MotorcycleRepository } from "../../../../domain/repositories/MotorcycleRepository";
import { IntervalRepository } from "../../../../domain/repositories/IntervalRepository";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";

export const CreateMotorcycleUseCaseProvider: Provider = {
  provide: CreateMotorcycleUseCase,
  useFactory: (
    motorcycleRepo: MotorcycleRepository,
    intervalRepo: IntervalRepository,
    concessionRepo: ConcessionRepository
  ) => {
    return new CreateMotorcycleUseCase(motorcycleRepo, intervalRepo, concessionRepo);
  },
  inject: ["MotorcycleRepository", "IntervalRepository", "ConcessionRepository"],
};
