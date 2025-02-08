export class ClientMotorcycleNotFoundException extends Error {
    constructor() {
      super("Aucune relation client-moto trouvée.");
      this.name = "ClientMotorcycleNotFoundException";
    }
  }
  