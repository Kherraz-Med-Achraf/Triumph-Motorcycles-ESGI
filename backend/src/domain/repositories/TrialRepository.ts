import { TrialEntity } from "../entities/TrialEntity";

export interface TrialRepository {
  create(trial: TrialEntity): Promise<TrialEntity>;
  findById(id: string): Promise<TrialEntity | null>;
  findActiveTrial(clientId: string, motorcycleId: string): Promise<TrialEntity | null>; 
  findAll(): Promise<TrialEntity[]>;
  findAllByClient(clientId: string): Promise<TrialEntity[]>;
  update(trial: TrialEntity): Promise<TrialEntity>;
  delete(id: string): Promise<void>;
}
