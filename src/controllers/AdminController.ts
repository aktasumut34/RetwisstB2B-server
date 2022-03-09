import { Request, Response } from "express";
import AdminService from "../services/admin";
import { numberTest } from "../utils/strUtils";

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
