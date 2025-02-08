export class NoClientMotorcyclesFoundException extends Error {
    constructor() {
      super("Aucune moto n'est associée à ce client.");
      this.name = "NoClientMotorcyclesFoundException";
    }
  }
  