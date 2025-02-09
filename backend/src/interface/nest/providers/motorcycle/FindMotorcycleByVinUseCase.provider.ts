import { Provider } from "@nestjs/common";
import { FindMotorcycleByVinUseCase } from "../../../../application/use-cases/motorcycle/FindMotorcycleByVinUseCase";
import { MotorcycleRepository } from "../../../../domain/repositories/MotorcycleRepository";
import { IntervalRepository } from "../../../../domain/repositories/IntervalRepository";

export const FindMotorcycleByVinUseCaseProvider: Provider = {
  provide: FindMotorcycleByVinUseCase,
  useFactory: (motoRepo: MotorcycleRepository, intervalRepo:IntervalRepository ) => {
    return new FindMotorcycleByVinUseCase(motoRepo, intervalRepo);
  },
  inject: ["MotorcycleRepository", "IntervalRepository"],
};
