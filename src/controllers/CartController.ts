import { User } from "@prisma/client";
import { Request, Response } from "express";
import CartService from "../services/cart";
interface ICartRequest extends Request {
  user?: User;
}
export const add = async (req: ICartRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const product = await CartService.add({
    variant_id: req.body.variant_id,
    quantity: req.body.quantity,
    user: req.user,
  });
  return res.status(200).json({ product });
};
export const update = async (req: ICartRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const product = await CartService.update({
    id: req.body.cart_item_id,
    quantity: req.body.quantity,
    user: req.user,
  });
  return res.status(200).json({ product });
};
export const remove = async (req: ICartRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  const product = await CartService.remove({
    id: req.body.cart_item_id,
    user: req.user,
  });
  return res.status(200).json({ product });
};
