export class CompanyEntity {
  constructor(
    public id: string,
    public name: string,
    public address: string,
    public userId: string | null,
    public createdAt: Date = new Date()
  ) {}
}
