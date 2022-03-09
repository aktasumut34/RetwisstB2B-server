import { Router } from "express";
import {
  allCategories,
  createCategory,
  oneCategory,
  removeCategory,
} from "../../../controllers/AdminController";
const router = Router();
router.get("/all", allCategories);
router.post("/create", createCategory);
router.post("/remove", removeCategory);
router.get("/:id", oneCategory);
export default router;
