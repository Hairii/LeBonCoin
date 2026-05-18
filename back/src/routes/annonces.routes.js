import express from "express";
import {
  fetchAnnonces,
  fetchAnnonceById,
  addAnnonce,
  editAnnonce,
  removeAnnonce,
  fetchAnnoncesByUser,
} from "../controllers/annonces.controller.js";
import { verifyToken } from "../middlewares/token.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  annonceSchema,
  annonceUpdateSchema,
} from "../validations/annonce.validation.js";

const router = express.Router();

router.get("/", fetchAnnonces);
router.get("/user/:id", fetchAnnoncesByUser);
router.get("/:id", fetchAnnonceById);

router.post("/", verifyToken, validate(annonceSchema), addAnnonce);
router.put("/:id", verifyToken, validate(annonceUpdateSchema), editAnnonce);
router.delete("/:id", verifyToken, removeAnnonce);

export default router;
