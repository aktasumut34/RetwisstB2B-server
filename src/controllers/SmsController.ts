import { User } from "@prisma/client";
import { Request, Response } from "express";
import SmsService from "../services/sms";
interface IAuthRequest extends Request {
  user?: User;
}
export const createAndSend2FACode = async (
  req: IAuthRequest,
  res: Response
) => {
  const { to } = req.body;
  if (!req.user) {
    return res.status(401).json({ errors: ["Invalid access token"] });
  }
  const success = await SmsService.createAndSend2FACode(to, req.user);
  return res.status(200).json({ success });
};

export const verify2FACode = async (req: IAuthRequest, res: Response) => {
  const { to, code } = req.body;
  if (!req.user) {
    return res.status(401).json({ errors: ["Invalid access token"] });
  }
  const success = await SmsService.verifyPhone(to, code);
  return res.status(200).json({ success });
};
