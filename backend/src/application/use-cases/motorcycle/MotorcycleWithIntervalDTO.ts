export interface MotorcycleWithIntervalDTO {
    id: string;
    vin: string;
    model: string;
    concessionId: string;
    createdAt: Date;
    intervalType?: string;
    intervalValue?: number;
  }
  