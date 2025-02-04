export class CompanyEntity {
  constructor(
    public id: string,
    public name: string,
    public managerUserId: string, 
    public createdAt: Date = new Date()
  ) {}
}
