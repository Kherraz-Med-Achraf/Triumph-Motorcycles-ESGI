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
  
    // La FK
    @Column()
    motorcycleId: string;
  
    @ManyToOne(() => MotorcycleTypeORMEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "motorcycleId" })
    motorcycle: MotorcycleTypeORMEntity;
  
    @Column()
    createdAt: Date;
  }
  