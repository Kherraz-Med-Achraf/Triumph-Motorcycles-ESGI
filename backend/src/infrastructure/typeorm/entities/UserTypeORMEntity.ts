// src/infrastructure/typeorm/entities/UserTypeORMEntity.ts

import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class UserTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string; // 'ADMIN', 'DRIVER', etc.

  // Champs communs
  @Column()
  nom: string;

  @Column()
  prenom: string;

  // Driver/Client
  @Column({ type: "uuid", nullable: true })
  motorcycleId: string | null;

  @Column({ type: "date", nullable: true })
  licenseExpiration: Date | null;

  @Column({ type: "varchar", length: 10, nullable: true })
  licenseCountry: string | null;
  

  @Column({ type: "varchar", length: 20, nullable: true })
  licenseNumber: string | null;
  

  // Driver
  @Column({ type: "varchar", length: 15, nullable: true })
  experience: string | null;
  

  // Client
  @Column({ type: "varchar", length: 255, nullable: true })
  address: string | null;
  

  @Column()
  createdAt: Date;
}
