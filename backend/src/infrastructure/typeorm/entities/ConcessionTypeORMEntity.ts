import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("concessions")
export class ConcessionTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ type: "text", nullable: true }) 
  managerUserId: string | null;

  @Column()
  address: string;

  @Column()
  createdAt: Date;
}
