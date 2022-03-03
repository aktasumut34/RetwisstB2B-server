import { Router } from "express";
import {
  allProducts,
  categories,
  categoryProducts,
  categoryFilters,
  oneProduct,
} from "../../controllers/ProductController";
const router = Router();

router.get("/", allProducts);
router.get("/product/:slug", oneProduct);
router.get("/categories", categories);
router.post("/category/:slug", categoryProducts);
router.get("/category/:slug/filters", categoryFilters);

export default router;
