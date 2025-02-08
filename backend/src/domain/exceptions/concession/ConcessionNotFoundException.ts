export class ConcessionNotFoundException extends Error {
    constructor() {
      super("La concession demandée n'existe pas.");
      this.name = "ConcessionNotFoundException";
    }
  }
  