import { Router } from "express";
import {
  getAvailableShippingMethods,
  removeAddress,
  updateOrCreateAddress,
} from "../../../controllers/UserController";
const router = Router();
router.post("/update", updateOrCreateAddress);
router.post("/remove", removeAddress);
router.get("/shipping-methods", getAvailableShippingMethods);
export default router;
