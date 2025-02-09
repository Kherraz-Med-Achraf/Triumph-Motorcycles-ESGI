export class InvalidDriverDataException extends Error {
    constructor() {
      super("Les données du conducteur sont invalides.");
      Object.setPrototypeOf(this, InvalidDriverDataException.prototype);
      this.name = "InvalidDriverDataException";
    }
  }
  