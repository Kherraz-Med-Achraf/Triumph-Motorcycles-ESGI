export type UserRole = 
  | "ADMIN" 
  | "MANAGER_COMPANY" 
  | "MANAGER_CONCESSION" 
  | "CLIENT"
  | "DRIVER";

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public nom: string,
    public prenom: string,
    public createdAt: Date = new Date()
  ) {}
}
