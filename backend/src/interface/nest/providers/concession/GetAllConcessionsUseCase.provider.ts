import { Provider } from "@nestjs/common";
import { GetAllConcessionsUseCase } from "../../../../application/use-cases/concession/GetAllConcessionsUseCase";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";

export const GetAllConcessionsUseCaseProvider: Provider = {
  provide: GetAllConcessionsUseCase,
  useFactory: (concessionRepo: ConcessionRepository) => {
    return new GetAllConcessionsUseCase(concessionRepo);
  },
  inject: ["ConcessionRepository"],
};
