import React, { useState } from "react";
import ISkill from "../../utils/interfaces/ISkill";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./Skill.css";

export type SkillProps = ISkill & {
  wilderId: number;
};

const Skill = ({ name, id, wilderId }: SkillProps) => {
  const [isOver, setIsOver] = useState<boolean>(false);

  const removeSkill = async (id: number, skillId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wilders/${id}/skill/${skillId}/delete`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      {name}
      <div
        className={isOver ? "delete-btn" : "hide"}
        onClick={() => removeSkill(wilderId, id)}
      >
        <AiOutlineCloseCircle />
      </div>
    </li>
  );
};

export default Skill;
