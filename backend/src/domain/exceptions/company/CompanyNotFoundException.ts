export class CompanyNotFoundException extends Error {
    constructor() {
      super("Entreprise non trouvée.");
      this.name = "CompanyNotFoundException";
    }
  }
  