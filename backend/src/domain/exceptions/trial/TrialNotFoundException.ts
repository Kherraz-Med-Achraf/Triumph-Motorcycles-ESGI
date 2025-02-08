export class TrialNotFoundException extends Error {
    constructor() {
      super("L'essai demandé n'existe pas.");
      this.name = "TrialNotFoundException";
    }
  }
  