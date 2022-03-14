import { User } from "@prisma/client";
import { Request, Response } from "express";
import AdminService from "../services/admin";
import { numberTest } from "../utils/strUtils";

interface ITicketRequest extends Request {
  user?: User;
}

// Users
export const allUsers = async (req: Request, res: Response) => {
  const users = await AdminService.allUsers();
  if (!users) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json(users);
};
export const approveUser = async (req: Request, res: Response) => {
  const { id, status } = req.body;
  let user = {};
  if (id) user = await AdminService.approveUser(id, status);
  if (!user) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ user, success: true });
};

export const removeUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  let user = {};
  if (id) user = await AdminService.removeUser(id);
  if (!user) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ user, success: true });
};

export const oneUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || numberTest(id)) {
    const user = await AdminService.oneUser(parseInt(id));
    if (!user) return res.status(400).json({ error: "Bad request" });
    return res.status(200).json({ user, success: true });
  } else return res.status(400).json({ error: "Bad request" });
};

// Categories
export const allCategories = async (req: Request, res: Response) => {
  const categories = await AdminService.allCategories();
  if (!categories) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ categories });
};
export const createCategory = async (req: Request, res: Response) => {
  const { name, slug, description } = req.body;
  let category = {};
  if (name)
    category = await AdminService.createCategory({ name, slug, description });
  if (!category) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ category, success: true });
};
export const oneCategory = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || numberTest(id)) {
    const category = await AdminService.oneCategory(parseInt(id));
    if (!category) return res.status(400).json({ error: "Bad request" });
    return res.status(200).json({ category, success: true });
  } else return res.status(400).json({ error: "Bad request" });
};
export const removeCategory = async (req: Request, res: Response) => {
  const { id } = req.body;
  let category = {};
  if (id) category = await AdminService.removeCategory(id);
  if (!category) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ category, success: true });
};

// Products

export const allProducts = async (req: Request, res: Response) => {
  const products = await AdminService.allProducts();
  if (!products) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ products });
};
export const createProduct = async (req: Request, res: Response) => {
  const { name, slug, description, model } = req.body;
  let product = {};
  if (name)
    product = await AdminService.createProduct({
      name,
      slug,
      description,
      model,
    });
  if (!product) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ product, success: true });
};
export const oneProduct = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || numberTest(id)) {
    const product = await AdminService.oneProduct(parseInt(id));
    if (!product) return res.status(400).json({ error: "Bad request" });
    return res.status(200).json({ product, success: true });
  } else return res.status(400).json({ error: "Bad request" });
};
export const removeProduct = async (req: Request, res: Response) => {
  const { id } = req.body;
  let product = {};
  if (id) product = await AdminService.removeProduct(id);
  if (!product) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ product, success: true });
};

// Orders

export const allOrders = async (req: Request, res: Response) => {
  const orders = await AdminService.allOrders();
  if (!orders) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ orders });
};
export const oneOrder = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || numberTest(id)) {
    const order = await AdminService.oneOrder(parseInt(id));
    if (!order) return res.status(400).json({ error: "Bad request" });
    return res.status(200).json({ order, success: true });
  } else return res.status(400).json({ error: "Bad request" });
};
export const updateOrderItems = async (req: Request, res: Response) => {
  const { order_id, items } = req.body;
  let orderItems = {};
  if (order_id)
    orderItems = await AdminService.updateOrderItems(order_id, items);
  if (!orderItems) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ orderItems, success: true });
};
export const getAllStatuses = async (req: Request, res: Response) => {
  const statuses = await AdminService.getAllStatuses();
  if (!statuses) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ statuses });
};
export const addHistory = async (req: Request, res: Response) => {
  const { order_id, status_id, description } = req.body;
  let history = {};
  if (order_id)
    history = await AdminService.addHistory(order_id, status_id, description);
  if (!history) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ history, success: true });
};

// Support

export const allTickets = async (req: Request, res: Response) => {
  const tickets = await AdminService.allTickets();
  if (!tickets) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ tickets });
};
export const oneTicket = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id || numberTest(id)) {
    const ticket = await AdminService.oneTicket(parseInt(id));
    if (!ticket) return res.status(400).json({ error: "Bad request" });
    return res.status(200).json({ ticket, success: true });
  } else return res.status(400).json({ error: "Bad request" });
};
export const sendTicketMessage = async (req: ITicketRequest, res: Response) => {
  const { ticket_id, message } = req.body;
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  let ticket = {};
  if (ticket_id && message)
    ticket = await AdminService.sendMessage(message, ticket_id, req.user);
  if (!ticket) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ ticket, success: true });
};
export const markTicket = async (req: ITicketRequest, res: Response) => {
  const { ticket_id, status } = req.body;
  if (!req.user) return res.status(401).json({ error: "Unauthorized" });
  let ticket = {};
  if (ticket_id && status)
    ticket = await AdminService.markTicket(ticket_id, status);
  if (!ticket) return res.status(400).json({ error: "Bad request" });
  return res.status(200).json({ ticket, success: true });
};
