export class IntervalNotFoundException extends Error {
    constructor() {
      super("Aucun interval trouvé pour cette moto.");
      this.name = "IntervalNotFoundException";
    }
  }
  