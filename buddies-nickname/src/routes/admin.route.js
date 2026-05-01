import express from 'express';
import { verifyAdmin, verifyToken } from '../middlewares/verifyToken.middleware.js';
import { buddyAssigning, getAllUsers } from '../controllers/admin.controller.js';
import { deleteUser } from '../services/admin.service.js';
const router = express.Router()

router.post("/", verifyToken,verifyAdmin, buddyAssigning);
router.get("/", verifyToken,verifyAdmin, getAllUsers);
router.delete("/", verifyToken, verifyAdmin, deleteUser)
export default router;