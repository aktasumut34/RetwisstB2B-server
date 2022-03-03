import { Phone, PrismaClient, User } from "@prisma/client";
import twilio from "twilio";
import UserService from "./user";
const account_sid = process.env.TWILIO_ACCOUNT_SID;
const auth_token = process.env.TWILIO_AUTH_TOKEN;
const messaging_service = process.env.TWILIO_MESSAGING_SERVICE;
const client = twilio(account_sid, auth_token);
const prisma = new PrismaClient();
const sendSms = async (to: string, body: string): Promise<boolean> => {
  const msg = await client.messages.create({
    body,
    to,
    messagingServiceSid: messaging_service,
  });
  return (
    msg.status === "accepted" ||
    msg.status === "queued" ||
    msg.status === "sending" ||
    msg.status === "sent"
  );
};
const send2FACode = async (user: User, phone: Phone) => {
  const faCode = (Math.floor(Math.random() * 90000) + 10000).toString();
  const userUpdated = await prisma.user.update({
    where: { id: user.id },
    data: {
      Phones: {
        update: {
          where: { id: phone.id },
          data: {
            faCode,
          },
        },
      },
    },
  });
  if (userUpdated)
    return sendSms(phone.number, `Your Retwisst B2B 2FA code is ${faCode}`);
  else return false;
};
export default {
  sendSms,
  send2FACode,
  createAndSend2FACode: async (
    number: string,
    user: User
  ): Promise<boolean> => {
    const { phone } = await UserService.createPhone(user, { number });
    return phone ? await send2FACode(user, phone) : false;
  },
  verifyPhone: async (number: string, faCode: string): Promise<boolean> => {
    const phone = await prisma.phone.updateMany({
      where: {
        number,
        faCode,
      },
      data: {
        verified: true,
      },
    });
    return !!phone.count;
  },
};
