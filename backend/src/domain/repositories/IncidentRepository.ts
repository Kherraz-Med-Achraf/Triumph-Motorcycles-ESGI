import { IncidentEntity } from "../entities/IncidentEntity";

export interface IncidentRepository {
  create(incident: IncidentEntity): Promise<IncidentEntity>;
  findById(id: string): Promise<IncidentEntity | null>;
  findAll(): Promise<IncidentEntity[]>;
  findAllByMotorcycle(motorcycleId: string): Promise<IncidentEntity[]>;
  update(incident: IncidentEntity): Promise<IncidentEntity>;
  delete(id: string): Promise<void>;
}
