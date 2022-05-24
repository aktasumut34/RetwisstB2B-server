import { Router } from "express";
import {
  allOrders,
  oneOrder,
  updateOrderItems,
  updateOrderExpenses,
  getAllStatuses,
  addHistory,
  addProductToOrder,
  addExpenseToOrder,
  allExpenses,
} from "../../../controllers/AdminController";
const router = Router();
router.get("/all", allOrders);
router.get("/statuses", getAllStatuses);
router.get("/expenses", allExpenses);
router.get("/:id", oneOrder);
router.post("/add-history", addHistory);
router.post("/update-items", updateOrderItems);
router.post("/update-expenses", updateOrderExpenses);
router.post("/add-product-to-order", addProductToOrder);
router.post("/add-expense-to-order", addExpenseToOrder);
export default router;
