import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("concessions")
export class ConcessionTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  managerUserId: string;

  @Column()
  address: string;

  @Column()
  createdAt: Date;
}
