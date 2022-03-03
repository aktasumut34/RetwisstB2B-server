import { Router } from "express";
import {
  createTicket,
  ticketStatuses,
  getTicket,
  sendMessage,
  markTicket,
} from "../../controllers/SupportController";
const router = Router();

router.get("/ticket-statuses", ticketStatuses);
router.post("/ticket/create", createTicket);
router.get("/ticket/:ticket_id", getTicket);
router.post("/ticket/send-message", sendMessage);
router.post("/ticket/mark", markTicket);

export default router;
