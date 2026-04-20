import express from "express";
import {
  allBuddies,
  createNewBuddy,
  getBuddyById,
  updateExistingBuddy,
  deleteExistingBuddy,
} from "../controllers/buddies.controller.js";
const router = express.Router();
// routes for the buddies CRUD 
router.get("/", allBuddies);
router.get("/:employeeId", getBuddyById);
router.post("/", createNewBuddy);
router.patch("/:employeeId", updateExistingBuddy);
router.delete("/:employeeId", deleteExistingBuddy);
export default router;
