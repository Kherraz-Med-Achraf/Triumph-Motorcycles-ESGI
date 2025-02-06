import { DataSource } from "typeorm";
import { entities } from "../typeorm/entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  port: 5432,
  username: process.env.POSTGRES_USER || "myuser",
  password: process.env.POSTGRES_PASSWORD || "mypassword",
  database: process.env.POSTGRES_DB || "mydb",
  entities,
  synchronize: true, // En dev, créera la table si elle n'existe pas
});
