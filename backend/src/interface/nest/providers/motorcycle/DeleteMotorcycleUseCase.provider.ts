import { Provider } from "@nestjs/common";
import { DeleteMotorcycleUseCase } from "../../../../application/use-cases/motorcycle/DeleteMotorcycleUseCase";
import { MotorcycleRepository } from "../../../../domain/repositories/MotorcycleRepository";

export const DeleteMotorcycleUseCaseProvider: Provider = {
  provide: DeleteMotorcycleUseCase,
  useFactory: (motoRepo: MotorcycleRepository) => {
    return new DeleteMotorcycleUseCase(motoRepo);
  },
  inject: ["MotorcycleRepository"],
};
