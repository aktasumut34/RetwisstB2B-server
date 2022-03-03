import { User } from "@prisma/client";
import { Request, Response } from "express";
import FaqService from "../services/faq";
interface IAuthReqeust extends Request {
  user?: User;
}
export const getAllFaqs = async (req: IAuthReqeust, res: Response) => {
  const qa = await FaqService.getAllFaqs(
    parseInt(req.query?.language as string) || 1
  );
  return res.status(200).json({ qa });
};
