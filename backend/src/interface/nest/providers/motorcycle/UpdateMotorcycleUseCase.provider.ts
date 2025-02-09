import { Provider } from "@nestjs/common";
import { UpdateMotorcycleUseCase } from "../../../../application/use-cases/motorcycle/UpdateMotorcycleUseCase";
import { MotorcycleRepository } from "../../../../domain/repositories/MotorcycleRepository";
import { IntervalRepository } from "../../../../domain/repositories/IntervalRepository";

export const UpdateMotorcycleUseCaseProvider: Provider = {
  provide: UpdateMotorcycleUseCase,
  useFactory: (
    motorcycleRepo: MotorcycleRepository,
    intervalRepo: IntervalRepository
  ) => {
    return new UpdateMotorcycleUseCase(motorcycleRepo, intervalRepo);
  },
  inject: ["MotorcycleRepository", "IntervalRepository"],
};
