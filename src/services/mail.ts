import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export default {
  sendMail(to: string, subject: string, body: string) {
    return transporter.sendMail({
      from: "Retwisst B2B <b2b@retwisst.com>",
      to,
      subject,
      html: body,
    });
  },
};
