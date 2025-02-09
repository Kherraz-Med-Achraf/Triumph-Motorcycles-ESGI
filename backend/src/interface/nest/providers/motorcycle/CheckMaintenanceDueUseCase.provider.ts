import { Provider } from "@nestjs/common";
import { CheckMaintenanceDueUseCase } from "../../../../application/use-cases/motorcycle/CheckMaintenanceDueUseCase";
import { IntervalRepository } from "../../../../domain/repositories/IntervalRepository";

export const CheckMaintenanceDueUseCaseProvider: Provider = {
  provide: CheckMaintenanceDueUseCase,
  useFactory: (intervalRepo: IntervalRepository) => {
    return new CheckMaintenanceDueUseCase(intervalRepo);
  },
  inject: ["IntervalRepository"],
};
