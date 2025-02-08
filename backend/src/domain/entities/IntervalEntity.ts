export class IntervalEntity {
    constructor(
      public id: string,
      public type: "KM" | "TIME",  
      public value: number,       
      public motorcycleId: string,
      public createdAt: Date = new Date(),
    ) {}
  }
  