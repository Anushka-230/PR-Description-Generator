import express from "express";
import {
  githubLogin,
  githubCallback,getRepositories
} from "../controllers/githubController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/login", githubLogin);
router.get("/callback", githubCallback);
router.get("/repos", getRepositories);

export default router;