import React from "react";

import ProfileImg from "../../assets/blank_profile.png";
import Skill from "../Skill/Skill";
import "./Wilder.css";
import Iwilder from "../../utils/interfaces/IWilder";

export type WilderProps = Iwilder;
const Wilder = ({ id, name, city, email, skills }: WilderProps) => {
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
        {skills?.map((skill) => {
          return <Skill key={skill.id} {...skill} wilderId={id} />;
        })}
      </ul>
      <h4>Contact</h4>
      <p>{email}</p>
    </article>
  );
};

export default Wilder;
