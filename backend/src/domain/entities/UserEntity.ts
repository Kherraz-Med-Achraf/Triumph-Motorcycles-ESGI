
export type UserRole = 'ADMIN' | 'MANAGER_COMPANY' | 'MANAGER_CONCESSION' | 'CLIENT';

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: UserRole,
    public createdAt: Date = new Date(),
  ) {}
}
