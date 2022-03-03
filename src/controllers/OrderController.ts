import { User } from "@prisma/client";
import { Request, Response } from "express";
import OrderService from "../services/order";
interface IAuthReqeust extends Request {
  user?: User;
}
export const createOrder = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const order = await OrderService.createOrder(
    req.user,
    req.body.items,
    req.body.address_id,
    req.body.shipping_method_id
  );
  if (!order) return res.status(400).json({ error: "Bad request" });
  await OrderService.clearCart(req.user);
  return res.status(200).json({ order, success: true });
};

export const getOrders = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const orders = await OrderService.getOrders(req.user);
  if (!orders) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ orders, success: true });
};

export const getOrder = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const order = await OrderService.getOrder(req.user, parseInt(req.params.id));
  if (!order) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ order, success: true });
};
