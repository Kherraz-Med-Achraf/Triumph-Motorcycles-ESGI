export class IntervalEntity {
  constructor(
    public id: string,
    public type: "KM" | "TIME",
    public value: number,
    public motorcycleId: string,
    public lastMileage: number, 
    public lastMaintenanceDate: Date,

    public createdAt: Date = new Date(),
  ) {}
}