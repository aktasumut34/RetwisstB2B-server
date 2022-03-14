import { Router } from "express";
import {
  allTickets,
  markTicket,
  oneTicket,
  sendTicketMessage,
} from "../../../controllers/AdminController";
const router = Router();
router.get("/all", allTickets);
router.get("/:id", oneTicket);
router.post("/send-message", sendTicketMessage);
router.post("/mark", markTicket);
export default router;
