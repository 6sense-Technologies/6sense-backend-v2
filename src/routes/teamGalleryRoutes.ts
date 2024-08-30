import express from "express";
import {
  createTeamGalleryController,
  getAllTeamGalleriesController,
  getTeamGalleryByIdController,
  updateTeamGalleryController,
  deleteTeamGalleryByIdController,
} from "../controllers/teamGalleryController";

const router = express.Router();

router.get("/team-gallery/all", getAllTeamGalleriesController);
router.post("/team-galleries", createTeamGalleryController);
router.get("/team-galleries/:id", getTeamGalleryByIdController);
router.put("/team-galleries/:id", updateTeamGalleryController);
router.delete("/team-galleries/:id", deleteTeamGalleryByIdController);

export default router;
