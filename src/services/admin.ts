import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  // Users
  allUsers: async () => {
    const users = await prisma.user.findMany({
      where: {
        Role: {
          isNot: {
            name: "Admin",
          },
        },
      },
      include: {
        Phones: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    const approved = users.filter((user) => user.status === 1);
    const pending = users.filter((user) => user.status === 0);
    const blocked = users.filter((user) => user.status === -1);
    return { approved, pending, blocked };
  },
  approveUser: async (id: number, status: number) => {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        status,
      },
    });
    if (status === 0 || status === -1) {
      await prisma.token.deleteMany({
        where: {
          user_id: id,
        },
      });
    }
    return user;
  },
  removeUser: async (id: number) => {
    const user = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return user;
  },
  oneUser: async (id: number) => {
    return await prisma.user.findFirst({
      where: {
        id: id,
      },
      select: {
        Phones: true,
        Addresses: true,
        Orders: {
          include: {
            OrderItems: {
              include: {
                Variant: {
                  include: {
                    Product: {
                      include: {
                        ProductDescriptions: true,
                      },
                    },
                    ProductVariantOptionValues: {
                      include: {
                        Option: true,
                      },
                    },
                  },
                },
              },
            },
            OrderStatusHistories: {
              include: {
                OrderStatus: true,
              },
            },
          },
        },
        Tickets: {
          include: {
            TicketMessages: {
              include: {
                TicketAttachments: true,
              },
            },
          },
        },
        Role: true,
        Tokens: true,
        Currency: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        status: true,
        company_address: true,
        company_country: true,
        company_employees: true,
        company_name: true,
        id: true,
      },
    });
  },

  // Categories
  allCategories: async () => {
    const categories = await prisma.category.findMany({
      include: {
        CategoryDescriptions: true,
        Products: {
          include: {
            Product: {
              select: {
                id: true,
                model: true,
                slug: true,
                _count: {
                  select: {
                    ProductVariants: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return categories;
  },
  createCategory: async ({
    slug = "",
    name = "",
    description = "",
  }: {
    slug: string;
    name: string;
    description: string;
  }) => {
    let category = null;
    const errors = [];
    try {
      category = await prisma.categoryDescription.create({
        data: {
          Category: {
            create: {
              slug,
            },
          },
          Language: {
            connect: {
              id: 1,
            },
          },
          name,
          description,
        },
      });
    } catch (e) {
      errors.push({ type: "slug", message: "Slug already exists" });
    }

    return { errors, category };
  },
  oneCategory: async (id: number) => {
    return await prisma.category.findFirst({
      where: {
        id: id,
      },
      include: {
        CategoryDescriptions: {
          include: {
            Language: true,
          },
        },
        Products: {
          include: {
            Product: {
              select: {
                id: true,
                model: true,
                slug: true,
                ProductImages: true,
                ProductDescriptions: true,
                _count: {
                  select: {
                    ProductVariants: true,
                    ProductOptions: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },
  removeCategory: async (id: number) => {
    const category = await prisma.category.delete({
      where: {
        id: id,
      },
    });
    return category;
  },

  //Products
  allProducts: async () => {
    const products = await prisma.product.findMany({
      include: {
        Categories: {
          include: {
            Category: {
              include: {
                CategoryDescriptions: true,
              },
            },
          },
        },
        ProductDescriptions: true,
        ProductImages: true,
        _count: {
          select: {
            ProductVariants: true,
          },
        },
      },
    });
    return products;
  },
  allVariants: async () => {
    const variants = await prisma.productVariant.findMany({
      select: {
        id: true,
        model: true,
        price: true,
      },
    });
    return variants;
  },
  createProduct: async ({
    slug = "",
    name = "",
    description = "",
    model = "",
  }: {
    slug: string;
    name: string;
    description: string;
    model: string;
  }) => {
    let product = null;
    const errors = [];
    try {
      product = await prisma.productDescription.create({
        data: {
          Product: {
            create: {
              slug,
              model,
            },
          },
          Language: {
            connect: {
              id: 1,
            },
          },
          name,
          description,
        },
      });
    } catch (e) {
      errors.push({ type: "slug", message: "Slug already exists" });
    }

    return { errors, product };
  },
  oneProduct: async (id: number) => {
    return await prisma.product.findFirst({
      where: {
        id: id,
      },
      include: {
        Categories: {
          include: {
            Category: {
              include: {
                CategoryDescriptions: true,
              },
            },
          },
        },
        ProductDescriptions: {
          include: {
            Language: true,
          },
        },
        ProductImages: true,
        ProductOptions: {
          include: {
            Option: true,
          },
        },
        ProductVariants: {
          include: {
            Images: true,
            ProductVariantOptionValues: {
              include: {
                Option: true,
              },
            },
          },
        },
      },
    });
  },
  removeProduct: async (id: number) => {
    const product = await prisma.product.delete({
      where: {
        id: id,
      },
    });
    return product;
  },

  // Orders
  allOrders: async () => {
    const orders = await prisma.order.findMany({
      include: {
        User: true,
        OrderStatusHistories: {
          include: {
            OrderStatus: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        OrderStatus: true,
        Currency: true,
        OrderItems: {
          include: {
            Variant: {
              include: {
                Product: {
                  include: {
                    ProductDescriptions: true,
                  },
                },
                ProductVariantOptionValues: {
                  include: {
                    Option: true,
                  },
                },
                Images: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  },
  oneOrder: async (id: number) => {
    return await prisma.order.findFirst({
      where: {
        id: id,
      },
      include: {
        User: true,
        BillingAddress: true,
        OrderItems: {
          include: {
            Variant: {
              include: {
                Images: true,
                Product: {
                  include: {
                    ProductDescriptions: true,
                    ProductImages: true,
                  },
                },
                ProductVariantOptionValues: {
                  include: {
                    Option: true,
                  },
                },
              },
            },
          },
          orderBy: {
            quantity: "desc",
          },
        },
        OrderStatus: true,
        OrderStatusHistories: {
          include: {
            OrderStatus: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        ShippingMethod: true,
        ShippingAddress: true,
        OrderFiles: {
          orderBy: {
            createdAt: "desc",
          },
        },
        OrderExpenses: {
          include: {
            Expense: true,
          },
        },
        Currency: true,
      },
    });
  },
  updateOrderItems: async (id: string, items: any) => {
    await prisma.orderItem.deleteMany({
      where: {
        order_id: parseInt(id),
      },
    });
    const orderExpenses = (
      await prisma.orderExpense.findMany({
        where: {
          order_id: parseInt(id),
        },
        select: {
          price: true,
          quantity: true,
        },
      })
    ).reduce((prev, cur) => prev + cur.price * cur.quantity, 0);
    await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        totalPrice:
          Object.keys(items).reduce((prev, cur) => {
            return prev + items[cur].unitPrice * items[cur].quantity;
          }, 0) + orderExpenses,
      },
    });
    return await prisma.orderItem.createMany({
      data: [
        ...Object.keys(items)
          .filter((item) => items[item].quantity > 0)
          .map((key) => {
            return {
              order_id: parseInt(id),
              variant_id: parseInt(key),
              quantity: parseInt(items[key].quantity),
              unitPrice: parseFloat(items[key].unitPrice),
            };
          }),
      ],
    });
  },
  updateOrderExpenses: async (id: string, items: any) => {
    await prisma.orderExpense.deleteMany({
      where: {
        order_id: parseInt(id),
      },
    });
    const orderItems = (
      await prisma.orderItem.findMany({
        where: {
          order_id: parseInt(id),
        },
        select: {
          unitPrice: true,
          quantity: true,
        },
      })
    ).reduce((prev, cur) => prev + cur.unitPrice * cur.quantity, 0);
    await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data: {
        totalPrice:
          Object.keys(items).reduce((cur, prev) => {
            return cur + items[prev].price * items[prev].quantity;
          }, 0) + orderItems,
      },
    });
    return await prisma.orderExpense.createMany({
      data: [
        ...Object.keys(items)
          .filter((item) => items[item].quantity > 0)
          .map((key) => {
            return {
              order_id: parseInt(id),
              expense_id: parseInt(key),
              quantity: parseInt(items[key].quantity),
              price: parseFloat(items[key].price),
              description: items[key].description,
            };
          }),
      ],
    });
  },
  getAllStatuses: async () => {
    return await prisma.orderStatus.findMany({});
  },
  addHistory: async (
    order_id: number,
    status_id: number,
    description: string
  ) => {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        order_status_id: status_id,
      },
    });
    return await prisma.orderStatusHistory.create({
      data: {
        order_id,
        status_id,
        description,
      },
    });
  },
  allExpenses: async () => {
    const expenses = await prisma.expense.findMany({
      select: {
        id: true,
        name: true,
        type: true,
      },
    });
    return expenses;
  },
  addProductToOrder: async (
    order_id: number,
    variant_id: number,
    quantity: number,
    unitPrice: number
  ) => {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        totalPrice: {
          increment: unitPrice * quantity,
        },
      },
    });
    const orderItem = await prisma.orderItem.findFirst({
      where: {
        order_id: order_id,
        variant_id: variant_id,
      },
    });
    return quantity > 0 && !orderItem
      ? await prisma.orderItem.create({
          data: {
            order_id,
            variant_id,
            quantity,
            unitPrice,
          },
        })
      : false;
  },
  addExpenseToOrder: async (
    order_id: number,
    expense_id: number,
    quantity: number,
    price: number,
    description: string
  ) => {
    await prisma.order.update({
      where: {
        id: order_id,
      },
      data: {
        totalPrice: {
          increment: price * quantity,
        },
      },
    });
    const orderExpense = await prisma.orderExpense.findFirst({
      where: {
        order_id: order_id,
        expense_id: expense_id,
      },
    });
    return quantity > 0 && !orderExpense
      ? await prisma.orderExpense.create({
          data: {
            order_id,
            expense_id,
            quantity,
            price,
            description,
          },
        })
      : false;
  },
  // Support
  allTickets: async () => {
    const status = await prisma.ticketStatus.findMany({
      include: {
        Tickets: {
          include: {
            User: true,
            TicketMessages: {
              include: {
                User: true,
                TicketAttachments: true,
              },
              orderBy: {
                createdAt: "desc",
              },
            },
          },
        },
      },
    });
    const tickets = status.map((s) => {
      return {
        ...s,
        Tickets: s.Tickets.map((t) => {
          return {
            ...t,
            lastMessageDate: t.TicketMessages[0].createdAt,
          };
        }),
      };
    });
    return tickets;
  },
  oneTicket: async (id: number) => {
    return await prisma.ticket.findFirst({
      where: {
        id: id,
      },
      include: {
        User: true,
        TicketStatus: true,
        TicketMessages: {
          include: {
            User: true,
            TicketAttachments: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
  },
  sendMessage: async (message: string, ticket_id: string, user: User) => {
    const errors = [];
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parseInt(ticket_id),
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
  markTicket: async (ticket_id: string, status: number) => {
    const errors = [];
    const ticket = await prisma.ticket.findFirst({
      where: {
        id: parseInt(ticket_id),
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
