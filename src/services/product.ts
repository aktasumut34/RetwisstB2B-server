import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  take: async ({ c = 0, s = 0 }: { c: number; s?: number }) => {
    return await prisma.product.findMany({
      take: c ? c : undefined,
      skip: s ? s : undefined,
      select: {
        id: true,
        model: true,
        slug: true,
        ProductDescriptions: {
          take: 1,
        },
      },
    });
  },
  one: async ({ slug }: { slug: string }) => {
    const product = await prisma.product.findUnique({
      where: {
        slug,
      },
      include: {
        ProductDescriptions: {
          orderBy: {
            language_id: "asc",
          },
          include: {
            Language: true,
          },
        },
        ProductImages: {
          orderBy: {
            sortOrder: "asc",
          },
        },
        ProductVariants: {
          include: {
            ProductVariantOptionValues: {
              include: {
                Option: true,
              },
            },
            Images: {
              orderBy: {
                sortOrder: "asc",
              },
            },
          },
        },
      },
    });
    const priceRange = {
      min: Math.min(...(product?.ProductVariants.map((p) => p.price) || [0])),
      max: Math.max(...(product?.ProductVariants.map((p) => p.price) || [0])),
    };
    const boxPerPalletRange = {
      min: Math.min(
        ...(product?.ProductVariants.map((p) => p.boxPerPallet) || [0])
      ),
      max: Math.max(
        ...(product?.ProductVariants.map((p) => p.boxPerPallet) || [0])
      ),
    };
    const productPerBoxRange = {
      min: Math.min(
        ...(product?.ProductVariants.map((p) => p.productPerBox) || [0])
      ),
      max: Math.max(
        ...(product?.ProductVariants.map((p) => p.productPerBox) || [0])
      ),
    };
    const filterOptionsGrouped: { [key: string]: string[] } = {};
    product?.ProductVariants.forEach((item) => {
      item.ProductVariantOptionValues.forEach((ov) => {
        const key = ov.Option.name;
        if (!filterOptionsGrouped[key]) {
          filterOptionsGrouped[key] = [];
        }
        if (!filterOptionsGrouped[key].includes(ov.value))
          filterOptionsGrouped[key].push(ov.value);
      });
    });

    const productOptionValues = product?.ProductVariants.map((p) => {
      const options: { [key: string]: string } = {};
      p.ProductVariantOptionValues.forEach((pov) => {
        options[pov.Option.name] = pov.value;
      });
      return {
        id: p.id,
        price: p.price,
        productPerBox: p.productPerBox,
        boxPerPallet: p.boxPerPallet,
        variant_options: options,
        images: p.Images,
      };
    });

    const returnProduct = {
      id: product?.id || 0,
      ProductDescriptions: product?.ProductDescriptions || {},
      ProductImages: product?.ProductImages || [],
    };

    return {
      product: returnProduct,
      priceRange,
      productPerBoxRange,
      boxPerPalletRange,
      filterOptionsGrouped,
      productOptionValues,
    };
  },
};
