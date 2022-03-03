import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default {
  take: async ({ c = 0, s = 0 }: { c?: number; s?: number }) => {
    return await prisma.category.findMany({
      take: c ? c : undefined,
      skip: s ? s : undefined,
      select: {
        id: true,
        CategoryDescriptions: true,
        slug: true,
      },
    });
  },
  products: async ({
    c,
    s,
    category_slug = "",
    filters = {},
    priceRange = {},
  }: {
    c?: number;
    s?: number;
    category_slug: string;
    filters?: { [key: string]: string[] };
    priceRange?: { min?: number; max?: number };
  }) => {
    const fProcessed = Object.entries(filters).map(([key, values]) => {
      return values.length > 0
        ? {
            ProductVariantOptionValues: {
              some: {
                AND: [
                  {
                    Option: {
                      name: key,
                    },
                  },
                  {
                    value: {
                      in: values,
                    },
                  },
                ],
              },
            },
          }
        : {};
    });
    const products = await prisma.product.findMany({
      where: {
        AND: [
          {
            Categories: {
              some: {
                Category: {
                  slug: category_slug,
                },
              },
            },
          },
          {
            AND: [
              {
                ProductVariants: {
                  some: {
                    AND: [
                      { AND: fProcessed },
                      {
                        AND: [
                          {
                            price: {
                              gte: parseFloat(
                                priceRange.min?.toString() || "0"
                              ),
                            },
                          },
                          {
                            price: {
                              lte: parseFloat(
                                priceRange.max?.toString() ||
                                  Number.MAX_SAFE_INTEGER.toString()
                              ),
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
      take: c && c > 0 ? c : undefined,
      skip: s && s > 0 ? s : undefined,
      select: {
        id: true,
        ProductDescriptions: {
          orderBy: {
            language_id: "asc",
          },
        },
        slug: true,
        Categories: {
          select: {
            Category: true,
          },
          orderBy: {
            id: "asc",
          },
        },
        ProductImages: {
          select: {
            id: true,
            image: true,
            sortOrder: true,
          },
          orderBy: {
            sortOrder: "asc",
          },
        },
        ProductVariants: {
          orderBy: { price: "asc" },
          take: 1,
        },
      },
      orderBy: {
        id: "desc",
      },
    });
    return products;
  },
  count: async ({
    category_slug,
    filters = {},
    priceRange = {},
  }: {
    category_slug: string;
    filters?: { [key: string]: string[] };
    priceRange?: { min?: number; max?: number };
  }) => {
    const fProcessed = Object.entries(filters).map(([key, values]) => {
      return values.length > 0
        ? {
            ProductVariantOptionValues: {
              some: {
                AND: [
                  {
                    Option: {
                      name: key,
                    },
                  },
                  {
                    value: {
                      in: values,
                    },
                  },
                ],
              },
            },
          }
        : {};
    });
    return await prisma.product.count({
      where: {
        AND: [
          {
            Categories: {
              every: {
                Category: {
                  slug: category_slug,
                },
              },
            },
          },
          {
            AND: [
              {
                ProductVariants: {
                  some: {
                    AND: [
                      { AND: fProcessed },
                      {
                        AND: [
                          {
                            price: {
                              gte: parseFloat(
                                priceRange.min?.toString() || "0"
                              ),
                            },
                          },
                          {
                            price: {
                              lte: parseFloat(
                                priceRange.max?.toString() ||
                                  Number.MAX_SAFE_INTEGER.toString()
                              ),
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            ],
          },
        ],
      },
    });
  },
  filters: async ({ category_slug }: { category_slug: string }) => {
    const filters = await prisma.productVariantOptionValue.findMany({
      where: {
        ProductVariant: {
          Product: {
            Categories: {
              every: {
                Category: {
                  slug: category_slug,
                },
              },
            },
          },
        },
      },
      select: {
        value: true,
        Option: {
          select: { name: true },
        },
        ProductVariant: {
          select: {
            price: true,
          },
        },
      },
    });
    const filterOptions = filters.map((filter) => {
      return {
        name: filter.Option.name,
        value: filter.value,
        price: filter.ProductVariant.price,
      };
    });
    const filterOptionsGrouped = filterOptions.reduce((acc, cur) => {
      const key = cur.name;
      if (!acc[key]) {
        acc[key] = new Set();
      }
      acc[key].add(cur.value);
      return acc;
    }, {} as { [key: string]: Set<string> });

    const priceRange = {
      min: Math.min(
        ...filterOptions.map((filter) => {
          return filter.price;
        })
      ),
      max: Math.max(
        ...filterOptions.map((filter) => {
          return filter.price;
        })
      ),
    };
    const filtersFinal: { [key: string]: string[] } = {};
    for (const key in filterOptionsGrouped) {
      filtersFinal[key] = Array.from(filterOptionsGrouped[key]);
    }
    return {
      filters: filtersFinal,
      priceRange,
    };
  },
  getCategoryDescriptions: async ({
    category_slug,
  }: {
    category_slug: string;
  }) => {
    const descriptions = await prisma.categoryDescription.findMany({
      where: {
        Category: {
          slug: category_slug,
        },
      },
      select: {
        name: true,
      },
    });
    return descriptions;
  },
};
