import { Router } from "express";
import {
  registerUser,
  loginUser,
  listUsers,
  deleteUser,
  updateUser,
  singleUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", listUsers);
router.get("/users/:id", singleUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);

export default router;
