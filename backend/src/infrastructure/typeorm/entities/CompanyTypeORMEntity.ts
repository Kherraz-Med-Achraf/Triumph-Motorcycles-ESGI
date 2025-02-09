import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("companies")
export class CompanyTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ type: "text", nullable: true }) 
  userId: string | null;

  @Column()
  createdAt: Date;
}
