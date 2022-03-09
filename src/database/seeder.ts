import { PrismaClient } from "@prisma/client";
import bcyrpt from "bcrypt";
import { faker } from "@faker-js/faker";
import {
  barbante,
  ribbon,
  ribbonLurex,
  xxlace,
  chainyCotton,
  chainyCottonMouline,
  slimCotton,
  tShirtYarn,
  chainyCottonCake,
  softCake,
  braidRainbow,
  chainyPolyester,
} from "./products";

const prisma = new PrismaClient();

const main = async () => {
  //Create a role
  await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: "Customer",
      },
      {
        name: "Admin",
        id: 1337,
      },
    ],
  });
  //Create admin
  const password = await bcyrpt.hash("secret", 10);
  await prisma.user.create({
    data: {
      status: 1,
      email: "u.akts1@gmail.com",
      password,
      name: faker.name.firstName(),
      roleId: 1337,
      Addresses: {
        createMany: {
          data: [
            {
              name: faker.random.arrayElement(["Office", "Factory", "Other"]),
              country: faker.address.country(),
              street: faker.address.streetAddress(),
              city: faker.address.city(),
              state: faker.address.state(),
              zip: faker.address.zipCode(),
            },
            {
              name: faker.random.arrayElement(["Office", "Other", "Factory"]),
              country: faker.address.country(),
              street: faker.address.streetAddress(),
              city: faker.address.city(),
              state: faker.address.state(),
              zip: faker.address.zipCode(),
            },
          ],
        },
      },
      Phones: {
        create: {
          number: faker.phone.phoneNumberFormat(),
          faCode: "1",
          verified: true,
        },
      },
    },
  });

  // Create a multiple user
  for (let i = 0; i < 20; i++) {
    const password = await bcyrpt.hash("secret", 10);
    await prisma.user.create({
      data: {
        status: 0,
        email: faker.internet.email(),
        password,
        name: faker.name.firstName(),
        roleId: 1,
        Addresses: {
          createMany: {
            data: [
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
            ],
          },
        },
        Phones: {
          create: {
            number: faker.phone.phoneNumberFormat(),
            faCode: "1",
            verified: true,
          },
        },
      },
    });
  }

  //Create ticket statuses
  const statuses = ["In Progress", "Resolved", "Closed"];
  for (let i = 0; i < statuses.length; i++) {
    await prisma.ticketStatus.create({
      data: {
        name: statuses[i],
      },
    });
  }
  const faq = [
    {
      q: "What are the minimum requirements to be a wholesale customer?",
      a: "Our minimum order amount is one pallet.",
    },
    {
      q: "Do you ship internationally?",
      a: "Yes, we ship  to over 40 countries.",
    },
    {
      q: "Do you have wholesale approval process work?",
      a: "First of all, you should fill out the application form or you can contact us directly by e-mail. We will get back to you within 1-2 business days. In this email, we will forward our catalog to you, then you should send us the products you choose with their quantities. After that we can start our work to send them to you as soon as possible.",
    },
    {
      q: "Shipping Terms",
      a: "EX works is a shipping arrangement wherein you would arrange the delivery of your order from our company’s address. In DAP we will arrange the shipment for you and the order would be delivered to your address. In FOB we will load the order till the Istanbul sea port and from there you would have to arrange the delivery. In CIF the order would be delivered to the sea port nearest to your address and the good would be insured incase of any damage. In CFR the order would be delivered to the sea port nearest to your address but the goods will not be insured incase of any damage.",
    },
    {
      q: "Do you offer custom labels and/or packaging?",
      a: "We have been selling yarn for a long time. We created our social media content, labels and packaging to fly off the shelves. We are always open to your new ideas and cooperation. Our in-house designers and strategists can create custom labels for your business. Private label designs are free.",
    },
    {
      q: "Who should I contact for a question about my order?",
      a: "We have a sales team who takes special care of you, you can call her/him or you can reach us at info@retwisst.com",
    },
    {
      q: "What dye certifications do you have for your yarns?",
      a: "All our yarns are certified using either OEKO-TEX Standard 100, this means that no harmful chemicals are used in the dying process.  GRS certification is coming soon",
    },
    {
      q: "How do I subscribe to your newsletter ?",
      a: "You can subscribe here for different pattern ideas, quality content and fun videos about yarns every Friday. Moreover, after becoming a wholesale customer, we will be sharing all these contents with you for sharing on your social media is free of charge.",
    },
    {
      q: "Are your yarns mulesing free?",
      a: "We only have one product that includes wool which is Wool Cake. We care about animal welfare and therefore we only use wool that is mulesing free. You can see our sensitivity to animal rights with our wool obtained from animals with uncut tails. Only shearing is applied to their wool. Other yarns that we produce, doesn't include any animal-related material.",
    },
    {
      q: "What are you doing to reduce your carbon footprint?",
      a: "ReTwisst is committed to being a responsible business and trying to reduce our environmental footprint. We are constantly working to improve processes and ways of working to help this. We are increasing the production of recycled products and we are trying to use cardboard and bags in the packaging section. We reduced our labels from 7 cm to 5 cm, thus protecting 1 ton of trees in 3 months. In addition, we don’t use any water during manufacturing process. By buying ReTwisst yarns, you protect not only your own health, but also the world and its sources. Let's protect our nature and world all together! What are you waiting for?",
    },
    {
      q: "Other Questions ?",
      a: "If you have another questions that are not answered here, please contact us.",
    },
  ];
  //Create language && faq
  const languages = [
    { id: 1, name: "English", code: "en-EN" },
    { id: 2, name: "Deutsch", code: "de-DE" },
  ];
  for (let i = 0; i < languages.length; i++) {
    const language = await prisma.language.create({
      data: {
        id: languages[i].id,
        name: languages[i].name,
        code: languages[i].code,
      },
    });
    for (let j = 0; j < faq.length; j++) {
      await prisma.frequentlyAskedQuestion.create({
        data: {
          question: faq[j].q,
          answer: faq[j].a,
          language_id: language.id,
        },
      });
    }
  }
  //Create Shipping Methods
  const shippingMethods = [
    {
      name: "Ex Works",
      acronym: "EXW",
      description:
        "In EXW you would arrange the delivery of your order from our company’s address.",
    },
    {
      name: "Delivered at Place",
      acronym: "DAP",
      description:
        "In DAP we will arrange the shipment for you and the order would be delivered to your address.",
    },
    {
      name: "Free on Board",
      acronym: "FOB",
      description:
        "In FOB we will load the order to available sea port in Turkey (like Istanbul, Izmir etc.) and from there you would have to arrange the delivery.",
    },
    {
      name: "Cost, Insurance and Freight",
      acronym: "CIF",
      description:
        "In CIF the order would be delivered to the sea port nearest to your address and the good would be insured incase of any damage.",
    },
    {
      name: "Cost and Freight",
      acronym: "CFR",
      description:
        "In CFR the order would be delivered to the sea port nearest to your address but the goods will not be insured incase of any damage.",
    },
  ];
  for (let i = 0; i < shippingMethods.length; i++) {
    await prisma.shippingMethod.create({
      data: {
        name: shippingMethods[i].name,
        acronym: shippingMethods[i].acronym,
        description: shippingMethods[i].description,
      },
    });
  }

  //Create Order Statuses
  const orderStatuses = [
    {
      name: "Pending",
      description: "Order is waiting for payment.",
      type: "info",
    },
    {
      name: "Processing",
      description: "Order is being processed.",
      type: "info",
    },
    {
      name: "Shipped",
      description: "Order is shipped.",
      type: "success",
    },
    {
      name: "Delivered",
      description: "Order is delivered.",
      type: "success",
    },
    {
      name: "Cancelled",
      description: "Order is cancelled.",
      type: "danger",
    },
  ];
  //Create options
  await prisma.option.createMany({
    data: [
      { id: 1, name: "Color" },
      { id: 2, name: "Size" },
    ],
  });
  for (let i = 0; i < orderStatuses.length; i++) {
    await prisma.orderStatus.create({
      data: {
        name: orderStatuses[i].name,
        description: orderStatuses[i].description,
        type: orderStatuses[i].type,
      },
    });
  }
  const categories = [
    {
      slug: "t-shirt-yarn",
      Descriptions: [
        {
          language_id: 1,
          name: "T-Shirt Yarn",
          description: `T-shirt Yarn is the first  product of our company. We took the first step into the recycle industry with this yarn. By using our recycled T-shirt Yarn, you can contribute to the environment and yourself. Because T-shirt yarn is produced from fabric remnants of textile companies without chemical processes. The production surplus comes to us as fibers or as fabric pieces. These products are sorted by quality and assembled in our factory. As a result of this process we produce our T-shirt Yarns. We have a big production capacity and wide color range for this yarn. But since we use waste fabrics the colors in stock constantly changes depending on the fashion trends and seasonal colors. Also, the weight, length and thickness may vary because of type and content of a fabric. To crochet or knit with T-shirt Yarn is very easy because of its thickness. You can end up your projects in very short time. If you don’t like the finished project or you are tired of it then just rip it and crochet another design. Your yarn won’t have any damage by ripping. This will give you the chance to try to crochet again and again new designs.`,
        },
        {
          language_id: 2,
          name: "Textil Garn",
          description: `T-shirt Yarn is the first  product of our company. We took the first step into the recycle industry with this yarn. By using our recycled T-shirt Yarn, you can contribute to the environment and yourself. Because T-shirt yarn is produced from fabric remnants of textile companies without chemical processes. The production surplus comes to us as fibers or as fabric pieces. These products are sorted by quality and assembled in our factory. As a result of this process we produce our T-shirt Yarns. We have a big production capacity and wide color range for this yarn. But since we use waste fabrics the colors in stock constantly changes depending on the fashion trends and seasonal colors. Also, the weight, length and thickness may vary because of type and content of a fabric. To crochet or knit with T-shirt Yarn is very easy because of its thickness. You can end up your projects in very short time. If you don’t like the finished project or you are tired of it then just rip it and crochet another design. Your yarn won’t have any damage by ripping. This will give you the chance to try to crochet again and again new designs.`,
        },
      ],
      Products: [tShirtYarn],
    },
    {
      slug: "recycled-craft-yarns",
      Descriptions: [
        {
          language_id: 1,
          name: "Recycled Craft Yarns",
          description: `They're from recycled yarn!`,
        },
        {
          language_id: 2,
          name: "Recycling Handkraft Garne",
          description: `They're from recycled yarn!`,
        },
      ],
      Products: [
        barbante,
        xxlace,
        chainyCotton,
        chainyCottonMouline,
        ribbon,
        ribbonLurex,
        slimCotton,
      ],
    },
    {
      slug: "cake-yarns",
      Descriptions: [
        {
          language_id: 1,
          name: "Cake Yarns",
          description: `They're shiny and colorful!`,
        },
        {
          language_id: 2,
          name: "Cake Garne",
          description: `They're shiny and colorful!`,
        },
      ],
      Products: [softCake, chainyCottonCake, braidRainbow],
    },
    {
      slug: "macrame-yarns",
      Descriptions: [
        {
          language_id: 1,
          name: "Macrame Yarns",
          description: `They're best for making macrame!`,
        },
        {
          language_id: 2,
          name: "Macrame Yarns",
          description: `They're best for making macrame!`,
        },
      ],
      Products: [chainyPolyester],
    },
  ];
  for (let i = 0; i < categories.length; i++) {
    const category = await prisma.category.create({
      data: {
        slug: categories[i].slug,
      },
    });
    for (let j = 0; j < categories[i].Descriptions.length; j++) {
      await prisma.categoryDescription.create({
        data: {
          language_id: categories[i].Descriptions[j].language_id,
          name: categories[i].Descriptions[j].name,
          description: categories[i].Descriptions[j].description,
          category_id: category.id,
        },
      });
    }
    for (let j = 0; j < categories[i].Products.length; j++) {
      const product = await prisma.product.create({
        data: {
          model: categories[i].Products[j].model,
          slug: categories[i].Products[j].slug,
        },
      });
      await prisma.productCategory.create({
        data: {
          product_id: product.id,
          category_id: category.id,
        },
      });
      for (let k = 0; k < categories[i].Products[j].Options.length; k++) {
        await prisma.productOption.create({
          data: {
            product_id: product.id,
            option_id: categories[i].Products[j].Options[k].option_id,
          },
        });
      }
      for (let k = 0; k < categories[i].Products[j].Descriptions.length; k++) {
        await prisma.productDescription.create({
          data: {
            language_id: categories[i].Products[j].Descriptions[k].language_id,
            name: categories[i].Products[j].Descriptions[k].name,
            product_id: product.id,
            description: categories[i].Products[j].Descriptions[k].description,
          },
        });
      }
      for (let k = 0; k < categories[i].Products[j].Images.length; k++) {
        await prisma.productImage.create({
          data: {
            image: categories[i].Products[j].Images[k].image,
            product_id: product.id,
            sortOrder: k,
          },
        });
      }
      for (let k = 0; k < categories[i].Products[j].Variants.length; k++) {
        const variant = await prisma.productVariant.create({
          data: {
            model: categories[i].Products[j].Variants[k].model,
            price: categories[i].Products[j].Variants[k].price,
            productPerBox: categories[i].Products[j].Variants[k].productPerBox,
            boxPerPallet: categories[i].Products[j].Variants[k].boxPerPallet,
            product_id: product.id,
          },
        });
        for (
          let l = 0;
          l < categories[i].Products[j].Variants[k].VariantOptionValues.length;
          l++
        ) {
          await prisma.productVariantOptionValue.create({
            data: {
              option_id:
                categories[i].Products[j].Variants[k].VariantOptionValues[l]
                  .option_id,
              value:
                categories[i].Products[j].Variants[k].VariantOptionValues[l]
                  .value,
              variant_id: variant.id,
            },
          });
        }
        for (
          let l = 0;
          l < categories[i].Products[j].Variants[k].ProductImages.length;
          l++
        ) {
          await prisma.productVariantImage.create({
            data: {
              image:
                categories[i].Products[j].Variants[k].ProductImages[l].image,
              variant_id: variant.id,
              sortOrder: l,
            },
          });
        }
      }
    }
  }

  /* Create a user
    for (let i = 0; i < 20; i++) {
    const password = await bcyrpt.hash("secret", 10);
    await prisma.user.create({
      data: {
        email: faker.internet.email(),
        password,
        name: faker.name.firstName(),
        roleId: role.id,
        Addresses: {
          createMany: {
            data: [
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
              {
                name: faker.random.arrayElement([
                  "Home",
                  "Office",
                  "Other",
                  "Factory",
                ]),
                country: faker.address.country(),
                street: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                zip: faker.address.zipCode(),
              },
            ],
          },
        },
        Phones: {
          create: {
            number: faker.phone.phoneNumberFormat(),
            faCode: "1",
            verified: true,
          },
        },
      },
    });
  }
  */

  /* Create Category & Product & Variants Randomly 
  //Create category && description
  for (let i = 0; i < 5; i++) {
    const name = faker.commerce.department();
    const cat = await prisma.category.create({
      data: { slug: faker.helpers.slugify(name).toLowerCase() + "-" + i },
    });
    for (let j = 1; j <= 3; j++) {
      await prisma.categoryDescription.create({
        data: {
          name: j === 1 ? name : faker.commerce.department(),
          category_id: cat.id,
          language_id: j,
        },
      });
    }
  }
  
  //Create product
  for (let i = 0; i < 250; i++) {
    await prisma.product.create({
      data: {
        model: faker.commerce.productName(),
        slug: faker.helpers.slugify(faker.datatype.uuid().toLowerCase()),
        Categories: {
          create: {
            category_id: faker.datatype.number({ min: 1, max: 5 }),
          },
        },
      },
    });
  }
  //Create product description
  for (let i = 1; i <= 250; i++) {
    for (let j = 1; j <= 3; j++) {
      await prisma.productDescription.create({
        data: {
          name: faker.commerce.productName(),
          language_id: j,
          product_id: i,
          description: faker.lorem.paragraph(),
        },
      });
    }
  }
  //Create product image
  for (let i = 1; i <= 250; i++) {
    const imageCount = faker.datatype.number({ min: 3, max: 6 });
    for (let j = 1; j <= imageCount; j++) {
      await prisma.productImage.create({
        data: {
          image:
            "//unsplash.it/1000/1000?a=" +
            faker.datatype.number({ min: 1, max: 100000 }),
          product_id: i,
          sortOrder: j,
        },
      });
    }
  }
  //Create options
  await prisma.option.createMany({
    data: [{ name: "Color" }, { name: "Size" }, { name: "Twist" }],
  });
  //Create product options
  for (let i = 1; i <= 250; i++) {
    for (let j = 1; j <= 2; j++) {
      await prisma.productOption.create({
        data: {
          option_id: j,
          product_id: i,
        },
      });
    }
  }
  //Create product variant && variant option value && images
  for (let i = 1; i <= 250; i++) {
    const variantCount = faker.datatype.number({ min: 5, max: 10 });
    for (let j = 1; j <= variantCount; j++) {
      const images = [
        ...Array.from(
          { length: faker.datatype.number({ min: 3, max: 6 }) },
          (element, i: number) => {
            return {
              image:
                "//unsplash.it/1000/1000?a=" +
                faker.datatype.number({ min: 1, max: 100000 }),
              sortOrder: i,
            };
          }
        ),
      ];
      await prisma.productVariant.create({
        data: {
          product_id: i,
          model: faker.commerce.productName(),
          price: faker.datatype.float({ min: 10, max: 300 }),
          productPerBox: faker.random.arrayElement([
            3, 8, 12, 18, 24, 100, 200,
          ]),
          boxPerPallet: faker.random.arrayElement([24, 30, 36, 48]),
          ProductVariantOptionValues: {
            createMany: {
              data: [
                { option_id: 1, value: faker.commerce.color() },
                {
                  option_id: 2,
                  value: faker.random.arrayElement([
                    "100g",
                    "250g",
                    "330g",
                    "500g",
                    "750g",
                    "1000g",
                  ]),
                },
              ],
            },
          },
          Images: {
            createMany: {
              data: images,
            },
          },
        },
      });
    }
  }
  */
};

main();
