import express from "express";
import {
  registerUser,
  signinUser,
  signOut,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register/:id", registerUser);
router.post("/login", signinUser);
router.get("/logout", signOut);
export default router;
