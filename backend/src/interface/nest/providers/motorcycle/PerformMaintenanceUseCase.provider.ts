import { Provider } from "@nestjs/common";
import { PerformMaintenanceUseCase } from "../../../../application/use-cases/motorcycle/PerformMaintenanceUseCase";
import { IntervalRepository } from "../../../../domain/repositories/IntervalRepository";

export const PerformMaintenanceUseCaseProvider: Provider = {
  provide: PerformMaintenanceUseCase,
  useFactory: (intervalRepo: IntervalRepository) => {
    return new PerformMaintenanceUseCase(intervalRepo);
  },
  inject: ["IntervalRepository"],
};
