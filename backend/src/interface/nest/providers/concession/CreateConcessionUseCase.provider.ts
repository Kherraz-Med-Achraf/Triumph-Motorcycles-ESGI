import { Provider } from "@nestjs/common";
import { CreateConcessionUseCase } from "../../../../application/use-cases/concession/CreateConcessionUseCase";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const CreateConcessionUseCaseProvider: Provider = {
  provide: CreateConcessionUseCase,
  useFactory: (
    concessionRepo: ConcessionRepository,
    userRepo: UserRepository
  ) => {
    return new CreateConcessionUseCase(concessionRepo, userRepo);
  },
  inject: ["ConcessionRepository", "UserRepository"],
};
