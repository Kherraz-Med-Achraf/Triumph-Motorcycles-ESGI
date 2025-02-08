export class VinAlreadyExistsException extends Error {
    constructor() {
      super("Une moto avec ce numéro VIN existe déjà.");
      this.name = "VinAlreadyExistsException";
    }
  }
  