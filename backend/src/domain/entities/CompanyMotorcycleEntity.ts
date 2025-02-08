//table qui permet de lier une company à une moto
export class CompanyMotorcycleEntity {
  constructor(
    public id: string,          
    public companyId: string,    
    public motorcycleId: string,

    public assignedAt: Date = new Date(), 
    public createdAt: Date = new Date()
  ) {}
}
