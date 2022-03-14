import { Router } from "express";
import {
  allOrders,
  oneOrder,
  updateOrderItems,
  getAllStatuses,
  addHistory,
} from "../../../controllers/AdminController";
const router = Router();
router.get("/all", allOrders);
router.get("/statuses", getAllStatuses);
router.get("/:id", oneOrder);
router.post("/add-history", addHistory);
router.post("/update-items", updateOrderItems);
export default router;
