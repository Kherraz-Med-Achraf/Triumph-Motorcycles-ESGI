import express from "express";
import cors from "cors";
import { AppDataSource } from "../../infrastructure/db/typeorm.config";
import bodyParser from "body-parser";

async function startExpress() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");

    const app = express();

    app.use(
      cors({
        origin: "http://localhost:5173",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true,
      })
    );

    app.use(bodyParser.json());


    app.listen(5000, () => {
      console.log("Express listening on http://localhost:5000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
}

startExpress();
