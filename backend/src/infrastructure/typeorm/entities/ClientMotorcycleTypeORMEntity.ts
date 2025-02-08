import {
    Entity,
    PrimaryColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { ClientTypeORMEntity } from "./ClientTypeORMEntity";
  import { MotorcycleTypeORMEntity } from "./MotorcycleTypeORMEntity";
  
  @Entity("client_motorcycles")
  export class ClientMotorcycleTypeORMEntity {
    @PrimaryColumn()
    id: string;
  
    @Column()
    clientId: string;
  
    @Column()
    motorcycleId: string;
  
    @ManyToOne(() => ClientTypeORMEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "clientId" })
    client: ClientTypeORMEntity;
  
    @ManyToOne(() => MotorcycleTypeORMEntity, { onDelete: "CASCADE" })
    @JoinColumn({ name: "motorcycleId" })
    motorcycle: MotorcycleTypeORMEntity;
  
    @Column({ type: "date" })
    assignedAt: Date;
  
    @Column()
    createdAt: Date;
  }
  