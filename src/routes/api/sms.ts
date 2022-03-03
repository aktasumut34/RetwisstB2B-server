import { Router } from "express";
import {
  createAndSend2FACode,
  verify2FACode,
} from "../../controllers/SmsController";
const router = Router();

router.post("/send-2fa-code", createAndSend2FACode);
router.post("/verify-2fa-code", verify2FACode);

export default router;
