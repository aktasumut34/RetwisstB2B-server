import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  getAllFaqs: async (language_id: number) => {
    return await prisma.frequentlyAskedQuestion.findMany({
      where: {
        language_id: language_id,
      },
    });
  },
};
