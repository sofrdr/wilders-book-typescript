import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ISkill from "../../utils/interfaces/ISkill";

type AddSkillFormProps = {
  wilderId: number;
  toggleForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddSkillForm = ({ wilderId, toggleForm }: AddSkillFormProps) => {
  const [skillsList, setSkillsList] = useState<ISkill[]>([]);
  const url = "http://localhost:5000/api/skills";

  const getSkills = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSkillsList(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSkills();
  }, []);

  // Create an array with skills' name only
  const skillsName = skillsList.map((skill) => {
    return skill.name;
  });

  const addSkillToWilder = async (skillId: number, wilderId: number) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/wilders/${wilderId}/skill/${skillId}/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  interface IFormInput {
    skill: number;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { skill } = data;
    addSkillToWilder(skill, wilderId);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-skill-form">
      <label>Select a skill :</label>
      <select {...register("skill")}>
        {skillsList.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
};

export default AddSkillForm;
