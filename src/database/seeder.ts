import { PrismaClient } from "@prisma/client";
import bcyrpt from "bcrypt";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const main = async () => {
  //Create a role
  const role = await prisma.role.create({
    data: {
      name: "Customer",
    },
  });
  //Create user
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
    },
    {
      name: "Processing",
      description: "Order is being processed.",
    },
    {
      name: "Shipped",
      description: "Order is shipped.",
    },
    {
      name: "Delivered",
      description: "Order is delivered.",
    },
    {
      name: "Cancelled",
      description: "Order is cancelled.",
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
      },
    });
  }
  const categories = [
    {
      slug: "recycled-craft-yarns",
      Descriptions: [
        {
          language_id: 1,
          name: "Recycled Craft Yarns",
        },
        {
          language_id: 2,
          name: "Recycling Handkraft Garne",
        },
      ],
      Products: [
        //XXlace
        {
          model: "XXLACE",
          slug: "xxlace",
          Descriptions: [
            {
              language_id: 1,
              name: "XXlace",
              description: `Another member of the Retwisst family is XXLace Yarn. The weight is 250 gr per roll and the length is 65 m. Our bulky cotton yarn is a mixture of 80% cotton and 20% polyester. Our cotton yarn is recycled from waste textile fiber like all of our other products. While knitting beautiful hand craft projects with cotton yarn, you can also protect the World! We recommend to use 8-10 mm crochet hook or knitting needles with our XXLace Yarn. Do you know what you can do with XXLace yarn? With this soft cord yarn you can crochet or knit amazing rugs, bags, wall accessories and blankets. Thick structure gives extra softness. Our durable yarn comes with 30 different color options. It’s never too late to start enjoying to create your dream designs! Let’s ReTwisst! XXLace Yarn is also perfect for bringing macrame patterns to life. It is easy to tie macrame knots with this sturdy yarn. You can easily make macrame wall hanging or macrame curtains. You can design many different macrame projects with ease. What are you waiting for? Let’s ReTwisst!`,
            },
            {
              language_id: 2,
              name: "XXlace",
              description: `Ein weiteres Mitglied der Retwisst Familie ist Xxlace Garn. Haben Sie unser Xxlace Garn getroffen? Lernen wir zuerst unser Garn kennen. Das Gewicht unseres Xxlace Garn beträgt 250gr und ist 65m lang. 80% Baumwolle ist eine Mischung aus 20% polyester. Es ist möglich, 8-10 mm Garn mit unserem Xxlace Garn zu verwenden. Ein weiteres und wichtigstes Merkmal unseres Xxlace Garns ist, dass es ein recycling produkt ist. Xxlace ist ein Recycling Baumwoll Garn. Beim stricken schöner Stoffe mit Baumwoll Garn schützen Sie auch Ihre Gesundheit.Wissen Sie, was Sie mit Xxlace Garn tun können? Ich erwähnte die Weichheit dieses Garns. Unser Xxlace Garn kann auch Cord Garn genannt werden. Wegen seiner dicken Struktur wird dieser Name gegeben. häkeln Teppiche, häkeln Taschen und Wohnaccessoires können gestrickt und gehäkelt werden. Unser Xxlace Garn hat 30 verschiedene Farboptionen. Sie könnendas stricken beginnen, indem Sie die gewünschte Farbe oder Farben auswählen. Lassen Sie sich Retwisst!`,
            },
          ],
          Images: [
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-1.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-2.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-3.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-4.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-5.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-6.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-7.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-8.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-9.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-10.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-11.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/xxlace/concept/xxlace-concept-12.jpg",
            },
          ],
          Options: [{ option_id: 1 }],
          Variants: [
            {
              model: "5001",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "White",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5001.jpg",
                },
              ],
            },
            {
              model: "5002",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Black",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5002.jpg",
                },
              ],
            },
            {
              model: "5003",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Grey",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5003.jpg",
                },
              ],
            },
            {
              model: "5004",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Light Grey",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5004.jpg",
                },
              ],
            },
            {
              model: "5005",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Jeans Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5005.jpg",
                },
              ],
            },
            {
              model: "5006",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Smoked",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5006.jpg",
                },
              ],
            },
            {
              model: "5007",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Sugar White",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5007.jpg",
                },
              ],
            },
            {
              model: "5008",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Beige",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5008.jpg",
                },
              ],
            },
            {
              model: "5009",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Dark Beige",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5009.jpg",
                },
              ],
            },
            {
              model: "5010",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Soft Yellow",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5010.jpg",
                },
              ],
            },
            {
              model: "5011",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Brown",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5011.jpg",
                },
              ],
            },
            {
              model: "5012",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Navy Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5012.jpg",
                },
              ],
            },
            {
              model: "5013",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Mint Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5013.jpg",
                },
              ],
            },
            {
              model: "5014",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Pistachio Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5014.jpg",
                },
              ],
            },
            {
              model: "5015",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Benetton",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5015.jpg",
                },
              ],
            },
            {
              model: "5016",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Khaki",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5016.jpg",
                },
              ],
            },
            {
              model: "5017",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Baby Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5017.jpg",
                },
              ],
            },
            {
              model: "5018",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Turquoise",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5018.jpg",
                },
              ],
            },
            {
              model: "5019",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Saxe Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5019.jpg",
                },
              ],
            },
            {
              model: "5020",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Light Lilac",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5020.jpg",
                },
              ],
            },
            {
              model: "5021",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Medium Pink",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5021.jpg",
                },
              ],
            },
            {
              model: "5022",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Dark Purple",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5022.jpg",
                },
              ],
            },
            {
              model: "5023",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Baby Pink",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5023.jpg",
                },
              ],
            },
            {
              model: "5024",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Fuschia",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5024.jpg",
                },
              ],
            },
            {
              model: "5025",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Yellow",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5025.jpg",
                },
              ],
            },
            {
              model: "5026",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Orange",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5026.jpg",
                },
              ],
            },
            {
              model: "5027",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Pinkish Orange",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5027.jpg",
                },
              ],
            },
            {
              model: "5028",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Violet",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5028.jpg",
                },
              ],
            },
            {
              model: "5029",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Red",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5029.jpg",
                },
              ],
            },
            {
              model: "5030",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Burgundy",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5030.jpg",
                },
              ],
            },
            {
              model: "5031",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Ecru",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5031.jpg",
                },
              ],
            },
            {
              model: "5032",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Pastel Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5032.jpg",
                },
              ],
            },
            {
              model: "5033",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Curry",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5033.jpg",
                },
              ],
            },
            {
              model: "5034",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Deep Lilac",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5034.jpg",
                },
              ],
            },
            {
              model: "5035",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Coffee Brown",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5035.jpg",
                },
              ],
            },
            {
              model: "5036",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Light Chocolate",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5036.jpg",
                },
              ],
            },
            {
              model: "5037",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Dark Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/xxlace/variants/5037.jpg",
                },
              ],
            },
          ],
        },
        //Ribbon
        {
          model: "Ribbon",
          slug: "ribbon",
          Descriptions: [
            {
              language_id: 1,
              name: "Ribbon",
              description: `Ribbon is one of the star members of our family! The structure is 80% cotton and 20% polyester with a very soft feel. Our tape yarn is also a recycled product. It is produced from recycled fibers which is compatible with human health and a massive contribution to the environment. We are using the waste of textiles and prevent them being discarded into nature by manufacturing a brand new product from them. Of course it’s not an easy process but we needed to do it to leave a better world for the future generations! Thanks to its soft structure, it's possible to knit almost anything with ribbon yarns. Our ribbons yarns weigh 250 gr and the length is 130m. We have a very wide color range with 30 different colours. Would you like to make place mats or rugs? Maybe you would like to crochet a fancy bag for yourself? How about knitting a beautiful runner as a gift to your mother? No problem at all with our bulky cotton yarn!! Our recycled Ribbon Yarns are suitable to use to create many different patterns from amigurumis to pillows, from bags to runner. For example, you can crochet place mats for 6 people with only 4 ribbon rolls. We recommend to use 7 mm crochet hook with our chunky yarn.`,
            },
            {
              language_id: 2,
              name: "Ribbon Garne",
              description: `Ribbon Garn ist eines der wichtigsten Mitglieder unserer Familie! Es hat eine weiche Struktur. Der Grund dafür ist, dass es 80% Baumwolle enthält. Der Rest davon ist Polyester. Unser Band Garn ist auch ein recycling Produkt. Es wird aus recycelten Fasern hergestellt, daher gibt es keinen Schaden für die Gesundheit; im Gegenteil, es trägt zu unserer Natur und unserer Umwelt bei. Ich spreche über die Bewertung der Verschwendung von Textilien, die in die Natur verworfen werden. Zusätzlich dazu, dass diese Abfall Produkte nicht in die Natur gelangen, sondern recycelt werden und daraus wird ein anderes Produkt produziert. Natürlich ist es nicht einfach, aber es ist sehr nützlich für alle. Wir schützen nicht nur uns selbst, sondern auch alle um uns herum. Es hat eine weiche Struktur Dank der Baumwolle darin. Deshalb ist es möglich, mit Ribbon Garnen alles zu stricken, was Sie wollen. Wenn Sie unser Produkt näher kennen lernen möchten, wiegen unsere Band Garne 250 gr und 130m Lang. Es ist möglich, sehr verschiedene Designs mit Ribbon Garn zu machen. Unsere Ribbons haben viele verschiedene Farboptionen für Sie. Sie können mit 30 verschiedenen Farben stricken. Sie können Platzset für 6 Personen mit 4 Stück Ribbon Garne häkeln. Sie können ein hand gefertigtes Design mit dem recyceltem Ribbon Baumwolle Garn haben. Für diesen service können wir Ihnen 7 mm Häkelnadel anbieten.`,
            },
          ],
          Images: [
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-1.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-2.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-3.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-4.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-5.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-6.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-7.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-8.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-9.jpg",
            },
            {
              image:
                "http://localhost:3100/images/products/ribbon/concept/ribbon-concept-10.jpg",
            },
          ],
          Options: [{ option_id: 1 }],
          Variants: [
            {
              model: "4001",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "White",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4001.jpg",
                },
              ],
            },
            {
              model: "4002",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Black",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4002.jpg",
                },
              ],
            },
            {
              model: "4003",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Grey",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4003.jpg",
                },
              ],
            },
            {
              model: "4004",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Light Grey",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4004.jpg",
                },
              ],
            },
            {
              model: "4005",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Jeans Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4005.jpg",
                },
              ],
            },
            {
              model: "4006",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Smoked",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4006.jpg",
                },
              ],
            },
            {
              model: "4007",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Sugar White",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4007.jpg",
                },
              ],
            },
            {
              model: "4008",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Beige",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4008.jpg",
                },
              ],
            },
            {
              model: "4009",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Dark Beige",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4009.jpg",
                },
              ],
            },
            {
              model: "4010",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Soft Yellow",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4010.jpg",
                },
              ],
            },
            {
              model: "4011",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Brown",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4011.jpg",
                },
              ],
            },
            {
              model: "4012",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Navy Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4012.jpg",
                },
              ],
            },
            {
              model: "4013",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Mint Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4013.jpg",
                },
              ],
            },
            {
              model: "4014",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Pistachio Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4014.jpg",
                },
              ],
            },
            {
              model: "4015",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Benetton",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4015.jpg",
                },
              ],
            },
            {
              model: "4016",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Khaki",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4016.jpg",
                },
              ],
            },
            {
              model: "4017",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Baby Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4017.jpg",
                },
              ],
            },
            {
              model: "4018",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Turquoise",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4018.jpg",
                },
              ],
            },
            {
              model: "4019",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Saxe Blue",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4019.jpg",
                },
              ],
            },
            {
              model: "4020",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Light Lilac",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4020.jpg",
                },
              ],
            },
            {
              model: "4021",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Medium Pink",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4021.jpg",
                },
              ],
            },
            {
              model: "4022",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Dark Purple",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4022.jpg",
                },
              ],
            },
            {
              model: "4023",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Baby Pink",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4023.jpg",
                },
              ],
            },
            {
              model: "4024",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Fuschia",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4024.jpg",
                },
              ],
            },
            {
              model: "4025",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Yellow",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4025.jpg",
                },
              ],
            },
            {
              model: "4026",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Orange",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4026.jpg",
                },
              ],
            },
            {
              model: "4027",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Pinkish Orange",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4027.jpg",
                },
              ],
            },
            {
              model: "4028",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Violet",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4028.jpg",
                },
              ],
            },
            {
              model: "4029",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Red",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4029.jpg",
                },
              ],
            },
            {
              model: "4030",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Burgundy",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4030.jpg",
                },
              ],
            },
            {
              model: "4031",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Ecru",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4031.jpg",
                },
              ],
            },
            {
              model: "4032",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Pastel Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4032.jpg",
                },
              ],
            },
            {
              model: "4033",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Curry",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4033.jpg",
                },
              ],
            },
            {
              model: "4034",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Deep Lilac",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4034.jpg",
                },
              ],
            },
            {
              model: "4035",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Coffee Brown",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4035.jpg",
                },
              ],
            },
            {
              model: "4036",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Light Chocolate",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4036.jpg",
                },
              ],
            },
            {
              model: "4037",
              price: 1.0,
              productPerBox: 18,
              boxPerPallet: 96,
              VariantOptionValues: [
                {
                  option_id: 1,
                  value: "Dark Green",
                },
              ],
              ProductImages: [
                {
                  image:
                    "http://localhost:3100/images/products/ribbon/variants/4037.jpg",
                },
              ],
            },
          ],
        },
      ],
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
