import { Provider } from "@nestjs/common";
import { GetAllMotorcyclesUseCase } from "../../../../application/use-cases/motorcycle/GetAllMotorcyclesUseCase";
import { MotorcycleRepository } from "../../../../domain/repositories/MotorcycleRepository";

export const GetAllMotorcyclesUseCaseProvider: Provider = {
  provide: GetAllMotorcyclesUseCase,
  useFactory: (motoRepo: MotorcycleRepository) => {
    return new GetAllMotorcyclesUseCase(motoRepo);
  },
  inject: ["MotorcycleRepository"],
};
