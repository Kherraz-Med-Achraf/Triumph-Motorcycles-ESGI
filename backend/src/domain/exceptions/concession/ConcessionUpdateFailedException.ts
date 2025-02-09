export class ConcessionUpdateFailedException extends Error {
    constructor() {
      super("La mise à jour de la concession a échoué.");
      this.name = "ConcessionUpdateFailedException";
    }
}
