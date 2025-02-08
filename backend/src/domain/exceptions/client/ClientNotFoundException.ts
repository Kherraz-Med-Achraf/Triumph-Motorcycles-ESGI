export class ClientNotFoundException extends Error {
    constructor() {
      super("Le client demandé n'existe pas.");
      this.name = "ClientNotFoundException";
    }
  }
  