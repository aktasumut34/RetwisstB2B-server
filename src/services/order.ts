import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  createOrder: async (
    user: User,
    items: [{ [key: string]: number }],
    address_id: number,
    shipping_method_id: number
  ) => {
    const u = await prisma.user.findFirst({
      where: { id: user.id },
      include: {
        Currency: true,
      },
    });
    const order = await prisma.order.create({
      data: {
        user_id: user.id,
        currency_id: u?.Currency?.id || 1,
        billing_address_id: address_id,
        shipping_address_id: address_id,
        order_status_id: 1,
        shipping_method_id: shipping_method_id,
        status: "pending",
        totalPrice:
          items.reduce((acc, item) => {
            return acc + item.unitPrice * item.quantity;
          }, 0) * (u?.Currency?.multiplier || 1),
        OrderItems: {
          createMany: {
            data: items.map((item) => {
              return {
                variant_id: item.variant_id,
                unitPrice: item.unitPrice * (u?.Currency?.multiplier || 1),
                quantity: item.quantity,
              };
            }),
          },
        },
        OrderStatusHistories: {
          create: {
            description: "Order created.",
            status_id: 1,
          },
        },
      },
    });
    return order;
  },
  clearCart: async (user: User) => {
    await prisma.cartItem.deleteMany({
      where: {
        user_id: user.id,
      },
    });
  },
  getOrders: async (user: User) => {
    const orders = await prisma.order.findMany({
      where: {
        user_id: user.id,
      },
      include: {
        ShippingMethod: true,
        OrderItems: {
          include: {
            Variant: true,
          },
        },
        OrderStatus: true,
        ShippingAddress: true,
        OrderStatusHistories: true,
        OrderFiles: true,
        Currency: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return orders;
  },
  getOrder: async (user: User, id: number) => {
    const order = await prisma.order.findFirst({
      where: {
        id,
        user_id: user.id,
      },
      include: {
        ShippingMethod: true,
        OrderItems: {
          include: {
            Variant: {
              include: {
                Images: true,
                ProductVariantOptionValues: true,
                Product: {
                  include: {
                    ProductDescriptions: true,
                    ProductImages: true,
                  },
                },
              },
            },
          },
        },
        OrderStatus: true,
        ShippingAddress: true,
        OrderStatusHistories: {
          include: {
            OrderStatus: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        Currency: true,
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
      },
    });
    return order;
  },
  uploadFile: async (
    order_id: number,
    file_path: string,
    description: string
  ) => {
    const order_file = await prisma.orderFile.create({
      data: {
        order_id,
        file: file_path.replace("public", "http://localhost:3100"),
        description,
      },
    });
    return order_file;
  },
};
