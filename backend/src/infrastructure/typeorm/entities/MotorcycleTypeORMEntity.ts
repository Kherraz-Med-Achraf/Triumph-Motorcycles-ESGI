import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ConcessionTypeORMEntity } from "./ConcessionTypeORMEntity";

@Entity("motorcycles")
export class MotorcycleTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  vin: string;

  @Column()
  model: string;

  @ManyToOne(() => ConcessionTypeORMEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "concessionId" })
  concession: ConcessionTypeORMEntity;

  @Column()
  concessionId: string;
  
  @Column()
  createdAt: Date;
}
