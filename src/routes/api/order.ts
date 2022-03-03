import { Router } from "express";
import {
  createOrder,
  getOrder,
  getOrders,
} from "../../controllers/OrderController";
const router = Router();

router.post("/create", createOrder);
router.get("/all", getOrders);
router.get("/one/:id", getOrder);

export default router;
