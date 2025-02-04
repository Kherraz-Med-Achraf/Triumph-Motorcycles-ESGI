import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('companies')
export class CompanyTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  managerUserId: string;

  @Column()
  createdAt: Date;
}
