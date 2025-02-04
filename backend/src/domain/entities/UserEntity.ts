export type UserRole =
  | "ADMIN"
  | "MANAGER_COMPANY"
  | "MANAGER_CONCESSION"
  | "CLIENT"
  | "DRIVER";
 export type UserExperience = "NOVICE" | "INTERMEDIATE" | "EXPERT";
export class UserEntity {
  constructor(
    // Champs pour tout les role
    public id: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public nom: string,
    public prenom: string,
    // Champs Driver ou Client
    public motorcycleId?: string,
    public licenseExpiration?: Date,
    public licenseCountry?: string,
    public licenseNumber?: string,
    // Champs Driver
    public experience?: UserExperience, //'NOVICE' | 'INTERMEDIATE' | 'EXPERT'
    // Champs Client
    public address?: string,
    public createdAt: Date = new Date()
  ) {}
}
