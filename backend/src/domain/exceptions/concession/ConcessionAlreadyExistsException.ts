export class ConcessionAlreadyExistsException extends Error {
    constructor() {
      super("Une concession avec ce nom existe déjà.");
      this.name = "ConcessionAlreadyExistsException";
    }
  }
  