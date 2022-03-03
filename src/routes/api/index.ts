import { Router } from "express";
import { auth } from "../../middlewares/auth";
import UserRouter from "./user";
import AuthRouter from "./auth";
import SmsRouter from "./sms";
import ProductRouter from "./product";
import CartRouter from "./cart";
import SupportRouter from "./support";
import FaqRouter from "./faq";
import OrderRouter from "./order";
const router = Router();

router.use("/user", auth, UserRouter);
router.use("/sms", auth, SmsRouter);
router.use("/product", auth, ProductRouter);
router.use("/cart", auth, CartRouter);
router.use("/support", auth, SupportRouter);
router.use("/faq", auth, FaqRouter);
router.use("/order", auth, OrderRouter);

router.use("/auth", AuthRouter);
export default router;
