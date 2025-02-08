export class InvalidUserRoleException extends Error {
    constructor() {
    super("L'utilisateur n'a pas le bon rôle.");
      this.name = "InvalidUserRoleException";
    }
  }
  