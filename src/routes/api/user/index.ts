import { Router } from "express";
import {
  me,
  allCurrencies,
  changeCurrency,
} from "../../../controllers/UserController";
import AddressRouter from "./address";
import PhoneRouter from "./phone";
const router = Router();
router.get("/", me);
router.get("/all-currencies", allCurrencies);
router.post("/change-currency", changeCurrency);
router.use("/address", AddressRouter);
router.use("/phone", PhoneRouter);
export default router;
