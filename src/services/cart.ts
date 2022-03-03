import { PrismaClient, User } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  add: async ({
    variant_id = 0,
    quantity = 0,
    user,
  }: {
    variant_id?: number;
    quantity?: number;
    user: User;
  }) => {
    const inCart = await prisma.cartItem.findMany({
      where: {
        variant_id,
        user_id: user.id,
      },
    });
    if (inCart.length <= 0) {
      return await prisma.cartItem.create({
        data: {
          quantity,
          variant_id,
          user_id: user.id,
        },
      });
    } else {
      return await prisma.cartItem.update({
        where: {
          id: inCart[0].id,
        },
        data: {
          quantity: inCart[0].quantity + quantity,
        },
      });
    }
  },
  remove: async ({ id = 0, user }: { id?: number; user: User }) => {
    return await prisma.cartItem.deleteMany({
      where: {
        AND: [{ id }, { user_id: user.id }],
      },
    });
  },
  update: async ({
    id = 0,
    quantity = 0,
    user,
  }: {
    id?: number;
    quantity?: number;
    user: User;
  }) => {
    if (!quantity) quantity = 1;
    await prisma.cartItem.updateMany({
      where: {
        AND: [{ id }, { user_id: user.id }],
      },
      data: {
        quantity,
      },
    });
  },
};
