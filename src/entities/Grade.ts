import { Entity, PrimaryColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { Wilder } from "./Wilder";
import { Skill } from "./Skill";

@Entity()
export class Grade {
  @PrimaryColumn()
  id: number;

  @Column({
    type: "int",
    unique: true,
  })
  value: number;
}
