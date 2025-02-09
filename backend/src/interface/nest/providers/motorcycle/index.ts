import { MotorcycleRepositoryProvider } from "./MotorcycleRepository.provider";
import { IntervalRepositoryProvider } from "./IntervalRepository.provider";

import { CreateMotorcycleUseCaseProvider } from "./CreateMotorcycleUseCase.provider";
import { UpdateMotorcycleUseCaseProvider } from "./UpdateMotorcycleUseCase.provider";
import { CheckMaintenanceDueUseCaseProvider } from "./CheckMaintenanceDueUseCase.provider";
import { PerformMaintenanceUseCaseProvider } from "./PerformMaintenanceUseCase.provider";
import { GetAllMotorcyclesUseCaseProvider } from "./GetAllMotorcyclesUseCase.provider";
import { FindMotorcyclesByConcessionUseCaseProvider } from "./FindMotorcyclesByConcessionUseCase.provider";
import { FindMotorcycleByVinUseCaseProvider } from "./FindMotorcycleByVinUseCase.provider";
import { DeleteMotorcycleUseCaseProvider } from "./DeleteMotorcycleUseCase.provider";

export const MotorcycleProviders = [
  MotorcycleRepositoryProvider,
  IntervalRepositoryProvider,

  CreateMotorcycleUseCaseProvider,
  UpdateMotorcycleUseCaseProvider,
  CheckMaintenanceDueUseCaseProvider,
  PerformMaintenanceUseCaseProvider,
  GetAllMotorcyclesUseCaseProvider,
  FindMotorcyclesByConcessionUseCaseProvider,
  FindMotorcycleByVinUseCaseProvider,
  DeleteMotorcycleUseCaseProvider,
];
