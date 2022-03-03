import { User } from "@prisma/client";
import { Request, Response } from "express";
import ProductService from "../services/product";
import CategoryService from "../services/category";
interface IAuthReqeust extends Request {
  user?: User;
}
export const allProducts = async (req: IAuthReqeust, res: Response) => {
  const prd = await ProductService.take({ c: 10 });
  return res.status(200).json({ prd });
};
export const oneProduct = async (req: IAuthReqeust, res: Response) => {
  const product = await ProductService.one({ slug: req.params.slug });
  return res.status(200).json(product);
};
export const categories = async (req: IAuthReqeust, res: Response) => {
  const categories = await CategoryService.take({});
  return res.status(200).json({ categories });
};
export const categoryProducts = async (req: IAuthReqeust, res: Response) => {
  const products = await CategoryService.products({
    category_slug: req.params.slug,
    c: parseInt(<string>req.body.limit),
    s: (parseInt(<string>req.body.page) - 1) * parseInt(<string>req.body.limit),
    filters: req.body.filters,
    priceRange: req.body.priceRange,
  });
  const total = await CategoryService.count({
    category_slug: req.params.slug,
    filters: req.body.filters,
    priceRange: req.body.priceRange,
  });
  const categoryDescriptions = await CategoryService.getCategoryDescriptions({
    category_slug: req.params.slug,
  });
  return res.status(200).json({ products, total, categoryDescriptions });
};

export const categoryFilters = async (req: IAuthReqeust, res: Response) => {
  const { filters, priceRange } = await CategoryService.filters({
    category_slug: req.params.slug,
  });

  return res.status(200).json({ filters, priceRange });
};
