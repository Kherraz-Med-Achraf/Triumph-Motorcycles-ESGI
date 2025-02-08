import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { CompanyTypeORMEntity } from "./CompanyTypeORMEntity";
import { MotorcycleTypeORMEntity } from "./MotorcycleTypeORMEntity";

@Entity("company_motorcycles")
export class CompanyMotorcycleTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  companyId: string;

  @ManyToOne(() => CompanyTypeORMEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "companyId" })
  company: CompanyTypeORMEntity;

  @Column()
  motorcycleId: string;

  @ManyToOne(() => MotorcycleTypeORMEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "motorcycleId" })
  motorcycle: MotorcycleTypeORMEntity;

  @Column({ type: "date" })
  assignedAt: Date;

  @Column()
  createdAt: Date;
}
