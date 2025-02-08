import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { MotorcycleTypeORMEntity } from "./MotorcycleTypeORMEntity";
  
  @Entity("incidents")
  export class IncidentTypeORMEntity {
    @PrimaryColumn()
    id: string;
  
    @Column()
    type: string; // "ACCIDENT", "PANNE", ...
  
    @Column()
    description: string;
  
    @Column({ type: "date" })
    date: Date;
  
    // La FK
    @Column()
    motorcycleId: string;
  
    // Relation => onDelete cascade
    @ManyToOne(() => MotorcycleTypeORMEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "motorcycleId" })
    motorcycle: MotorcycleTypeORMEntity;
  
    @Column()
    createdAt: Date;
  }
  