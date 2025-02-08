export class TrialEntity {
    constructor(
      public id: string,
      public clientId: string,       
      public motorcycleId: string,  
      public startDate: Date,        
      public endDate?: Date,         
      public createdAt: Date = new Date(),
    ) {}
  }
  