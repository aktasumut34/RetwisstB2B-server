import { Router } from "express";
import {
  allProducts,
  createProduct,
  oneProduct,
  removeProduct,
  allVariants,
} from "../../../controllers/AdminController";
const router = Router();
router.get("/all", allProducts);
router.post("/create", createProduct);
router.post("/remove", removeProduct);
router.get("/all-variants", allVariants);
router.get("/:id", oneProduct);
export default router;
