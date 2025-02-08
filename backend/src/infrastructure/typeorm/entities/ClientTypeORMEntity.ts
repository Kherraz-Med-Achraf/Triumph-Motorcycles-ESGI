import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserTypeORMEntity } from "./UserTypeORMEntity";

@Entity("clients")
export class ClientTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => UserTypeORMEntity, { onDelete: "CASCADE" }) 
  @JoinColumn({ name: "userId" })
  user: UserTypeORMEntity;

  @Column()
  userId: string;

  @Column({ nullable: true })
  address: string | null;

  @Column({ type: "date", nullable: true })
  licenseExpiration: Date | null;

  @Column({ nullable: true })
  licenseCountry: string | null;

  @Column({ nullable: true })
  licenseNumber: string | null;
}
