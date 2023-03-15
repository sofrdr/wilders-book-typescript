import { Router } from "express";
//import { create } from "../controllers/gradeController";

import { skillController } from "../controllers/skillController";
export const skillsRoutes = Router();

skillsRoutes.get("/", skillController.getAllSkills);
skillsRoutes.post("/", skillController.create);
skillsRoutes.put("/:id", skillController.updateSkill);
skillsRoutes.delete("/:id", skillController.deleteSkill);

//router.post("/grade", create);
