export type DriverExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";

export class DriverEntity {
  constructor(
    public id: string,          
    public userId: string,      
    public experience?: DriverExperience,
    public licenseExpiration?: Date,
    public licenseCountry?: string,
    public licenseNumber?: string,
    public companyId?: string, // La company du driver
    public companyMotorcycleId?: string // Référence à une moto spécifique de la company
  ) {}
}
