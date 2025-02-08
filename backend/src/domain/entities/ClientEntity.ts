export class ClientEntity {
  constructor(
    public id: string,
    public userId: string,
    public address?: string,            
    public licenseExpiration?: Date,    
    public licenseCountry?: string,
    public licenseNumber?: string,
  ) {}
}