import cors from "cors";
import express from "express";
import appDataSource from "./utils";
import { wildersRoutes } from "./routes/wilder-routes";
import { skillsRoutes } from "./routes/skill-routes";

const app = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/api/wilders", wildersRoutes);
app.use("/api/skills", skillsRoutes);

const start = async (): Promise<void> => {
  await appDataSource.initialize();
  app.listen(5000, () => {
    console.log("Listening on 5000");
  });
};

start();
