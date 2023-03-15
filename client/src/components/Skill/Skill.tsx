import React from "react";
import "./Skill.css";

export interface ISkillProps {
  id: number;
  name: string;
  wilderId: number;
}

const Skill = ({ name }: ISkillProps) => {
  return <li>{name}</li>;
};

export default Skill;
