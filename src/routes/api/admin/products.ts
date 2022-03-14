import { Router } from "express";
import {
  allProducts,
  createProduct,
  oneProduct,
  removeProduct,
} from "../../../controllers/AdminController";
const router = Router();
router.get("/all", allProducts);
router.post("/create", createProduct);
router.post("/remove", removeProduct);
router.get("/:id", oneProduct);
export default router;
