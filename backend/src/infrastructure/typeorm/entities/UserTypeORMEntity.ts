import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("users")
export class UserTypeORMEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column()
  createdAt: Date;
}
