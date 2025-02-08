export class MotorcycleNotFoundException extends Error {
    constructor() {
      super("La moto demandée n'existe pas.");
      this.name = "MotorcycleNotFoundException";
    }
  }
  