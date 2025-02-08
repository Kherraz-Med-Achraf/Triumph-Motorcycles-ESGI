export class IncidentEntity {
    constructor(
      public id: string,
      public type: string,          
      public description: string,
      public date: Date,            
      public motorcycleId: string,  
      public createdAt: Date = new Date(),
    ) {}
  }
  