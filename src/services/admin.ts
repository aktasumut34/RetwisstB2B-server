import { PrismaClient } from "@prisma/client";
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
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        status: true,
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
};
