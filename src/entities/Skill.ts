import { Entity, PrimaryColumn, Column, ManyToMany } from "typeorm";
import { Wilder } from "./Wilder";

@Entity()
export class Skill {
  @PrimaryColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany((type) => Wilder, (wilder) => wilder.skills)
  wilders: Wilder[];
}
