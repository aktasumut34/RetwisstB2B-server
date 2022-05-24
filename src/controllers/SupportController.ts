import { User } from "@prisma/client";
import { Request, Response } from "express";
import SupportService from "../services/support";
interface IAuthReqeust extends Request {
  user?: User;
}
export const ticketStatuses = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const { errors, ticketStatuses } = await SupportService.ticketStatuses();
  if (errors?.length) {
    return res.status(200).json({ errors });
  }
  return res.status(200).json({ ticketStatuses });
};

export const getTicket = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const { errors, ticket } = await SupportService.getTicket(
    req.params.ticket_id,
    req.user
  );
  if (errors?.length) {
    return res.status(200).json({ errors });
  }
  return res.status(200).json({ ticket });
};

export const createTicket = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const { errors, ticket } = await SupportService.createTicket(
    req.user,
    req.body.ticket
  );
  if (errors?.length) {
    return res.status(200).json({ errors });
  }
  return res.status(200).json({ success: true, ticket });
};

export const sendMessage = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const { errors } = await SupportService.sendMessage(
    req.body.message,
    req.body.ticket_id,
    req.user
  );
  if (errors?.length) {
    return res.status(200).json({ errors });
  }
  return res.status(200).json({ success: true });
};

export const markTicket = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const { errors } = await SupportService.markTicket(
    req.body.ticket_id,
    req.body.status,
    req.user
  );
  if (errors?.length) {
    return res.status(200).json({ errors });
  }
  return res.status(200).json({ success: true });
};
