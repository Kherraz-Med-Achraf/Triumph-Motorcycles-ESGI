export class ClientEntity {
    constructor(
      public id: string,           
      public userId: string,       
      public concessionId?: string,
      public address?: string,
    ) {}
  }
  