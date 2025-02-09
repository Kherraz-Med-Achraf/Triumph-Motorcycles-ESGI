import { Provider } from "@nestjs/common";
import { UpdateConcessionUseCase } from "../../../../application/use-cases/concession/UpdateConcessionUseCase";
import { ConcessionRepository } from "../../../../domain/repositories/ConcessionRepository";
import { UserRepository } from "../../../../domain/repositories/UserRepository";

export const UpdateConcessionUseCaseProvider: Provider = {
  provide: UpdateConcessionUseCase,
  useFactory: (
    concessionRepo: ConcessionRepository,
    userRepo: UserRepository
  ) => {
    return new UpdateConcessionUseCase(concessionRepo, userRepo);
  },
  inject: ["ConcessionRepository", "UserRepository"],
};
