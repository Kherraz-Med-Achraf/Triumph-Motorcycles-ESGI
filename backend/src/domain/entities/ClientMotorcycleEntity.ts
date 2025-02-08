export class ClientMotorcycleEntity {
    constructor(
      public id: string,
      public clientId: string,     
      public motorcycleId: string, 
      public assignedAt: Date = new Date(),  
      public createdAt: Date = new Date(),
    ) {}
  }
  