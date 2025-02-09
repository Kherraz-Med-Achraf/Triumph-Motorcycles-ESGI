import { Provider } from "@nestjs/common";
import { GetConcessionFromUserUseCase } from "../../../../application/use-cases/concession/GetConcessionFromUserUseCase";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const GetConcessionFromUserUseCaseProvider: Provider = {
  provide: GetConcessionFromUserUseCase,
  useFactory: (concessionRepo: ConcessionRepository, userRepo: UserRepository) => {
    return new GetConcessionFromUserUseCase(concessionRepo, userRepo);
  },
  inject: ["ConcessionRepository", "UserRepository"],
};
