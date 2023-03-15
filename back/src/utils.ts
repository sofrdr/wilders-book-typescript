import { DataSource } from "typeorm";
import { Wilder } from "./entities/Wilder";
import { Skill } from "./entities/Skill";
import { Grade } from "./entities/Grade";

const appDataSource = new DataSource({
  type: "sqlite",
  database: "./wilderdb.sqlite",
  synchronize: true,
  entities: [Wilder, Skill, Grade],
});

export default appDataSource;
