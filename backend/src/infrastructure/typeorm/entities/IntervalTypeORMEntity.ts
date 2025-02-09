import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { MotorcycleTypeORMEntity } from "./MotorcycleTypeORMEntity";
  


@Entity("intervals")
export class IntervalTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  type: string; // "KM" ou "TIME"

  @Column()
  value: number;

  @Column()
  motorcycleId: string;

  @ManyToOne(() => MotorcycleTypeORMEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "motorcycleId" })
  motorcycle: MotorcycleTypeORMEntity;

  @Column({ type: "float", default: 0 })
  lastMileage: number; 


  @Column({ type: "date", nullable: true })
  lastMaintenanceDate: Date;

  @Column()
  createdAt: Date;
}

  
  