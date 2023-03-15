import appDataSource from "../utils";
import validator from "validator";
import { Skill } from "../entities/Skill";
import { Express, Response, Request } from "express";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

export const skillController: IController = {
  create: async (req, res) => {
    try {
      const { name } = req.body;
      if (validator.isEmpty(name, { ignore_whitespace: true }) === true) {
        throw new Error("Field empty");
      }
      const newSkill = await appDataSource.getRepository(Skill).save(req.body);
      return res.status(201).send({ newSkill, message: "New skill created" });
    } catch (error) {
      if (error.code === "SQLITE_CONSTRAINT") {
        return res.status(409).send({ error: "Skill already exists" });
      }
      return res
        .status(400)
        .send({ error: error.message || "Error while creating new skill" });
    }
  },

  getAllSkills: async (req, res) => {
    try {
      const skills = await appDataSource.getRepository(Skill).find();
      return res.send(skills);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  },

  updateSkill: async (req, res) => {
    try {
      const skill = await appDataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.id) });
      if (!skill) {
        return res.status(404).send({ error: "No skill found" });
      }
      appDataSource.getRepository(Skill).merge(skill, req.body);
      const skillUpdated = await appDataSource.getRepository(Skill).save(skill);
      return res.status(201).send({ skillUpdated, message: "Skill updated" });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const skill = await appDataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.id) });
      if (!skill) {
        return res.status(404).send({ error: "No skill found" });
      }
      const data = await appDataSource
        .getRepository(Skill)
        .delete(req.params.id);
      return res.status(200).send({ data, message: "Skill deleted" });
    } catch (error) {
      return res.status(404).send({ error: error.message });
    }
  },
};
