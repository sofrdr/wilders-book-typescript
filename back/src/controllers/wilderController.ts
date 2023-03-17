import appDataSource from "../utils";
import { Wilder } from "../entities/Wilder";
import { Skill } from "../entities/Skill";
import validator from "validator";
import { Express, Response, Request } from "express";
import fs from "fs";

interface IController {
  [key: string]: (arg0: Request, arg1: Response) => {};
}

export const wilderController: IController = {
  create: async (req, res) => {
    try {
      const { email, name, city } = req.body;
      if (!email || validator.isEmail(email) === false) {
        throw new Error("Please enter a correct email");
      }
      const existingUser = await appDataSource
        .getRepository(Wilder)
        .findOneBy({ email: email });
      if (existingUser) {
        return res.status(409).send({ error: "Email already exists" });
      }

      if (!name || !city) {
        throw new Error("One of the fields is empty");
      }

      if (req.file) {
        const image = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
        const { name, email, city } = req.body;
        await appDataSource
          .getRepository(Wilder)
          .save({ image, name, city, email });
      } else {
        await appDataSource.getRepository(Wilder).save(req.body);
      }

      return res.status(201).send({ message: "New wilder created" });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  getAllWilders: async (req, res) => {
    try {
      const wilders = await appDataSource.getRepository(Wilder).find();
      res.send(wilders);
    } catch (error) {
      res.status(404).send({ error });
    }
  },

  updateWilder: async (req, res) => {
    try {
      const wilder = await appDataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.id) });
      if (!wilder) {
        return res.status(404).send({ error: "No wilder found" });
      }
      appDataSource.getRepository(Wilder).merge(wilder, req.body);
      const data = await appDataSource.getRepository(Wilder).save(wilder);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  deleteWilder: async (req, res) => {
    try {
      const wilder = await appDataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.id) });
      if (!wilder) {
        return res.status(404).send({ error: "No wilder found" });
      }
      const data = await appDataSource
        .getRepository(Wilder)
        .delete(req.params.id);
      return res.status(200).send(data);
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  addSkill: async (req, res) => {
    try {
      const wilderToUpdate = await appDataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId) });
      if (!wilderToUpdate) {
        return res.status(404).send({ error: "No wilder found" });
      }

      const skillToAdd = await appDataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.skillId) });
      if (!skillToAdd) {
        return res.status(404).send({ error: "No skill to add" });
      }

      wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
      const data = await appDataSource
        .getRepository(Wilder)
        .save(wilderToUpdate);
      return res.status(201).send({ message: "Skill created" });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },

  removeSkill: async (req, res) => {
    try {
      const wilderToUpdate = await appDataSource
        .getRepository(Wilder)
        .findOneBy({ id: parseInt(req.params.wilderId) });
      if (!wilderToUpdate) {
        return res.status(404).send({ error: "No wilder found" });
      }

      const skillToRemove = await appDataSource
        .getRepository(Skill)
        .findOneBy({ id: parseInt(req.params.skillId) });
      if (!skillToRemove) {
        return res.status(404).send({ error: "No skill to remove" });
      }
      console.log(wilderToUpdate.skills);
      const newSkills = wilderToUpdate.skills.filter(
        (item) => item.id !== skillToRemove.id
      );
      wilderToUpdate.skills = newSkills;

      await appDataSource.getRepository(Wilder).save(wilderToUpdate);
      return res.status(200).send({ message: "Skill deleted" });
    } catch (error) {
      return res.status(400).send({ error });
    }
  },
};
