import React, { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { WildersContext } from "../../utils/context/wildersContext";
import ISkill from "../../utils/interfaces/ISkill";
import "./AddSkillForm.css";

type AddSkillFormProps = {
  wilderId: number;
  //toggleForm: React.Dispatch<React.SetStateAction<boolean>>;
  toggleForm: any;
};

const AddSkillForm = ({ wilderId, toggleForm }: AddSkillFormProps) => {
  const [skillsList, setSkillsList] = useState<ISkill[]>([]);
  const url = "http://localhost:5000/api/skills";

  // Get fetchData function from context
  const { fetchData } = useContext(WildersContext);

  // Function to get all skills from BDD
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

  // Function to add a specific skill to a wilder
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
      fetchData();
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

  // When the form is submitted
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const { skill } = data;
    addSkillToWilder(skill, wilderId);
    toggleForm();
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
      <div className="form-buttons">
        <button type="submit" className="button">
          Submit
        </button>
        <button className="button" onClick={toggleForm}>
          Close
        </button>
      </div>
    </form>
  );
};

export default AddSkillForm;
