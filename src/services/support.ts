import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  ticketStatuses: async () => {
    const errors = [];
    const ticketStatuses = await prisma.ticketStatus.findMany();
    if (!ticketStatuses) {
      errors.push({
        message: "User not found",
        type: "auth",
      });
    }
    return { ticketStatuses, errors };
  },
  getTicket: async (ticket_id: string, user: User) => {
    const errors = [];
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parseInt(ticket_id),
        user_id: user.id,
      },
      include: {
        TicketMessages: {
          include: {
            TicketAttachments: true,
            user: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        user: true,
        TicketStatus: true,
      },
    });
    if (!ticket) {
      errors.push({
        message: "Ticket not found",
        type: "auth",
      });
    }
    await prisma.ticketMessage.updateMany({
      where: {
        ticket_id: parseInt(ticket_id),
        user_id: {
          not: user.id,
        },
      },
      data: {
        read: true,
      },
    });
    return { ticket, errors };
  },
  createTicket: async (
    user: User,
    ticket: { subject: string; message: string }
  ) => {
    const errors = [];
    let t;
    try {
      t = await prisma.ticket.create({
        data: {
          subject: ticket.subject,
          user_id: user.id,
          ticket_status_id: 1,
          TicketMessages: {
            create: {
              message: ticket.message,
              user_id: user.id,
            },
          },
        },
      });
    } catch (e) {
      errors.push({
        message: "Something went wrong",
        type: "error",
      });
    }
    return { errors, ticket: t };
  },
  sendMessage: async (message: string, ticket_id: string, user: User) => {
    const errors = [];
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parseInt(ticket_id),
        user_id: user.id,
      },
    });
    if (!ticket) {
      errors.push({
        message: "Ticket not found",
        type: "auth",
      });
    } else {
      const ticketMessage = await prisma.ticketMessage.create({
        data: {
          message,
          user_id: user.id,
          ticket_id: ticket.id,
        },
      });
      if (!ticketMessage) {
        errors.push({
          message: "Something went wrong",
          type: "error",
        });
      }
    }
    return { ticket, errors };
  },
  markTicket: async (ticket_id: string, status: number, user: User) => {
    const errors = [];
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parseInt(ticket_id),
        user_id: user.id,
      },
    });
    if (!ticket) {
      errors.push({
        message: "Ticket not found",
        type: "auth",
      });
    } else {
      const ticketStatus = await prisma.ticketStatus.findFirst({
        where: {
          id: status,
        },
      });
      if (!ticketStatus) {
        errors.push({
          message: "Ticket status not found",
          type: "auth",
        });
      } else {
        const updatedTicket = await prisma.ticket.update({
          where: {
            id: ticket.id,
          },
          data: {
            ticket_status_id: ticketStatus.id,
          },
        });
        if (!updatedTicket) {
          errors.push({
            message: "Something went wrong",
            type: "error",
          });
        }
      }
    }
    return { ticket, errors };
  },
};
