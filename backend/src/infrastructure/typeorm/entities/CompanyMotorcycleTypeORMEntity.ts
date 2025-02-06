import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("company_motorcycles")
export class CompanyMotorcycleTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  companyId: string;    

  @Column()
  motorcycleId: string; 

  @Column()
  createdAt: Date;
}
