import express from "express";
import { upload as multer } from "../middlewares/multer";
import { wilderController } from "../controllers/wilderController";

export const wildersRoutes = express.Router();

wildersRoutes.get("/", wilderController.getAllWilders);
wildersRoutes.post("/", multer, wilderController.create);
wildersRoutes.put("/:id", wilderController.updateWilder);
wildersRoutes.delete("/:id", wilderController.deleteWilder);
wildersRoutes.post("/:wilderId/skill/:skillId/add", wilderController.addSkill);
wildersRoutes.delete(
  "/:wilderId/skill/:skillId/delete",
  wilderController.removeSkill
);
