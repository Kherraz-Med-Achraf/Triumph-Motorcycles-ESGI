import { Provider } from "@nestjs/common";
import { FindMotorcyclesByConcessionUseCase } from "../../../../application/use-cases/motorcycle/FindMotorcyclesByConcessionUseCase";
import { MotorcycleRepository } from "../../../../domain/repositories/MotorcycleRepository";

export const FindMotorcyclesByConcessionUseCaseProvider: Provider = {
  provide: FindMotorcyclesByConcessionUseCase,
  useFactory: (motoRepo: MotorcycleRepository) => {
    return new FindMotorcyclesByConcessionUseCase(motoRepo);
  },
  inject: ["MotorcycleRepository"],
};
