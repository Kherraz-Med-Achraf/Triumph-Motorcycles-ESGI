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
  role: string; 

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  createdAt: Date;
}
