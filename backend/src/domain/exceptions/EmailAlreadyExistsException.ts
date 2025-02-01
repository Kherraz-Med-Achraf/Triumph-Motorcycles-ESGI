export class EmailAlreadyExistsException extends Error {
    constructor() {
      super("Email existe déjà");
      this.name = "EmailAlreadyExistsException";
    }
  }
  