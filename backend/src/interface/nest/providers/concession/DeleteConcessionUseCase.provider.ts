import { Provider } from "@nestjs/common";
import { DeleteConcessionUseCase } from "../../../../application/use-cases/concession/DeleteConcessionUseCase";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";

export const DeleteConcessionUseCaseProvider: Provider = {
  provide: DeleteConcessionUseCase,
  useFactory: (concessionRepo: ConcessionRepository) => {
    return new DeleteConcessionUseCase(concessionRepo);
  },
  inject: ["ConcessionRepository"],
};
