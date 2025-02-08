export class ClientAlreadyExistsException extends Error {
    constructor() {
      super("Un client avec cet utilisateur existe déjà.");
      this.name = "ClientAlreadyExistsException";
    }
  }
  