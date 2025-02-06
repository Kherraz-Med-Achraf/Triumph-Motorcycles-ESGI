import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserTypeORMEntity } from "./UserTypeORMEntity";

@Entity("drivers") 
export class DriverTypeORMEntity {
  @PrimaryColumn()
  id: string;

  // FK vers "users"
  @Column({ type: "uuid" }) 
  userId: string;

  @ManyToOne(() => UserTypeORMEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: UserTypeORMEntity;

  @Column({ type: "text", nullable: true }) 
  experience: string | null;

  @Column({ type: "date", nullable: true })
  licenseExpiration: Date | null;

  @Column({ type: "text", nullable: true }) 
  licenseCountry: string | null;

  @Column({ type: "text", nullable: true }) 
  licenseNumber: string | null;

  @Column({ type: "uuid", nullable: true })
  companyId: string | null;

  @Column({ type: "uuid", nullable: true }) 
  companyMotorcycleId: string | null;
}
