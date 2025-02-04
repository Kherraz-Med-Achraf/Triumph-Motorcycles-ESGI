export class ManagerUserNotFoundException extends Error {
    constructor() {
      super("Le user manager n'existe pas ou n'a pas le bon rôle");
    }
  }
  