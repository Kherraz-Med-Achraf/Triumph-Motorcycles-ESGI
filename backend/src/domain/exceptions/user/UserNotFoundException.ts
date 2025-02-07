export class UserNotFoundException extends Error {
    constructor() {
      super("Cette utilisateur n'existe pas");
      this.name = "UserNotFoundException";
    }
  }