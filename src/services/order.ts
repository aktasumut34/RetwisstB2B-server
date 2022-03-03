import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  createOrder: async (
    user: User,
    items: [{ [key: string]: number }],
    address_id: number,
    shipping_method_id: number
  ) => {
    const order = await prisma.order.create({
      data: {
        user_id: user.id,
        billing_address_id: address_id,
        shipping_address_id: address_id,
        order_status_id: 1,
        shipping_method_id: shipping_method_id,
        status: "pending",
        totalPrice: items.reduce((acc, item) => {
          return acc + item.unitPrice * item.quantity;
        }, 0),
        OrderItems: {
          createMany: {
            data: items.map((item) => {
              return {
                variant_id: item.variant_id,
                unitPrice: item.unitPrice,
                quantity: item.quantity,
              };
            }),
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
        OrderStatusHistories: true,
      },
    });
    return order;
  },
};
