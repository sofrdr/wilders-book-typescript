import React from "react";
import { ISkillProps } from "../Skill/Skill";
import ProfileImg from "../../assets/blank_profile.png";
import Skill from "../Skill/Skill";
import "./Wilder.css";

export interface IWilderProps {
  id: number;
  name: string;
  city?: string;
  email: string;
  skills?: ISkillProps[];
}

const Wilder = ({ id, name, city, email, skills }: IWilderProps) => {
  return (
    <article className="card">
      <img src={ProfileImg} alt={`${name} Profile`} />
      <h3>{name}</h3>
      <h4>{city}</h4>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
        aspernatur veritatis ducimus neque, fuga explicabo, cum reprehenderit
        odit suscipit eveniet dolores. Odio deleniti eligendi quas praesentium
        sunt nihil possimus porro.
      </p>
      <h4>Wild Skills</h4>
      <ul className="skills">
        {skills?.map((skill, i) => {
          return (
            <Skill key={i} name={skill.name} id={skill.id} wilderId={id} />
          );
        })}
      </ul>
      <h4>Contact</h4>
      <p>{email}</p>
    </article>
  );
};

export default Wilder;
