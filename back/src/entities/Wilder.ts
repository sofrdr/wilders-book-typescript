import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Skill } from "./Skill";

@Entity()
export class Wilder {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  image: string;

  @ManyToMany(() => Skill, (skill) => skill.wilders, {
    eager: true,
  })
  @JoinTable()
  skills: Skill[];
}
