
import { Provider } from "@nestjs/common";
import { GetConcessionUseCase } from "../../../../application/use-cases/concession/GetConcessionUseCase";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";

export const GetConcessionUseCaseProvider: Provider = {
  provide: GetConcessionUseCase,
  useFactory: (concessionRepo: ConcessionRepository) => {
    return new GetConcessionUseCase(concessionRepo);
  },
  inject: ["ConcessionRepository"],
};
