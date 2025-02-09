export type DriverExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";

export class DriverEntity {
  constructor(
    public id: string,          
    public userId: string,      
    public experience?: DriverExperience,
    public licenseExpiration?: Date,
    public licenseCountry?: string,
    public licenseNumber?: string,
    public companyId?: string, 
    public companyMotorcycleId?: string 
  ) {}
}
