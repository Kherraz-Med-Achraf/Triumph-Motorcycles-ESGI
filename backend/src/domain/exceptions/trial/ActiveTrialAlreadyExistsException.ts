export class ActiveTrialAlreadyExistsException extends Error {
    constructor() {
      super("Un essai actif existe déjà pour ce client et cette moto.");
      this.name = "ActiveTrialAlreadyExistsException";
    }
  }
  