export class MotorcycleEntity {
    constructor(
      public id: string,
      public vin: string,           
      public model: string,         
      public concessionId: string,  
      public createdAt: Date = new Date(),
    ) {}
  }
  