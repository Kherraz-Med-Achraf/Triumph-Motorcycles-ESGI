export class DriverNotFoundException extends Error {
    constructor() {
      super("Aucun Driver trouvé avec cet ID.");
      this.name = "DriverNotFoundException";
    }
  }