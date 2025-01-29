export class CompanyEntity {
    constructor(
      public id: string,
      public name: string,
      public managerId: string, // userId
    ) {}
  }
  