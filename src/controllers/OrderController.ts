import { User } from "@prisma/client";
import { Request, Response } from "express";
import OrderService from "../services/order";
import { numberTest } from "../utils/strUtils";
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
  if (!order) return res.status(200).json({ error: "Bad request" });
  await OrderService.clearCart(req.user);
  return res.status(200).json({ order, success: true });
};

export const getOrders = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const orders = await OrderService.getOrders(req.user);
  if (!orders) return res.status(200).json({ error: "Bad request" });
  return res.status(200).json({ orders, success: true });
};

export const getOrder = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const order = await OrderService.getOrder(req.user, parseInt(req.params.id));
  if (!order) return res.status(200).json({ error: "Bad request" });
  return res.status(200).json({ order, success: true });
};

export const uploadFile = async (req: IAuthReqeust, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  if (!req.file)
    return res.status(200).json({ error: "Not supported file format." });
  if (!numberTest(req.body.id))
    return res.status(200).json({ error: "Bad request" });
  const order_file = await OrderService.uploadFile(
    parseInt(req.body.id),
    req.file.path,
    req.body.description || ""
  );
  if (!order_file) return res.status(200).json({ error: "Bad request" });
  return res.status(200).json({ order_file, success: true });
};
