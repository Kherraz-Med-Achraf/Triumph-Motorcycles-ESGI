import { DataSource } from "typeorm";
import { UserTypeORMEntity } from "../typeorm/entities/UserTypeORMEntity";
import { CompanyTypeORMEntity } from "../typeorm/entities/CompanyTypeORMEntity";
import { ConcessionTypeORMEntity } from "../typeorm/entities/ConcessionTypeORMEntity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER || "myuser",
  password: process.env.POSTGRES_PASSWORD || "mypassword",
  database: process.env.POSTGRES_DB || "mydb",
  entities: [UserTypeORMEntity, CompanyTypeORMEntity, ConcessionTypeORMEntity],
  synchronize: true, // en dev, créera la table si elle n'existe pas
});
