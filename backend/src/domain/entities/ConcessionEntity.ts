export class ConcessionEntity {
  constructor(
    public id: string,
    public name: string,
    public managerUserId: string,
    public address: string,      
    public createdAt: Date = new Date(),
  ) {}
}
  