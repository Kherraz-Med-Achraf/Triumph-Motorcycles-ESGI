export class CompanyUpdateFailedException extends Error {
    constructor() {
      super("La mise à jour de l\'entreprise a échoué.");
      this.name = "CompanyUpdateFailedException";
    }
  }
  