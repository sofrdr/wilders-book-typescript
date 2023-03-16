import React from "react";
import ISkill from "../../utils/interfaces/ISkill";
import "./Skill.css";

export type SkillProps = ISkill & {
  wilderId: number;
};

const Skill = ({ name }: SkillProps) => {
  return <li>{name}</li>;
};

export default Skill;
