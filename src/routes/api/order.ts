import { Router } from "express";
import { upload } from "../../middlewares/upload";
import {
  createOrder,
  getOrder,
  getOrders,
  uploadFile,
} from "../../controllers/OrderController";
const router = Router();

router.post("/create", createOrder);
router.get("/all", getOrders);
router.get("/one/:id", getOrder);
router.post("/upload-file", upload.single("file"), uploadFile);

export default router;
