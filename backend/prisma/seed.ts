import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      name: "Wireless Bluetooth Headphones",
      description: "Premium wireless headphones with active noise cancellation and 30-hour battery life.",
      price: 79.99,
      sku: "WH-001",
      inventory: { quantity: 50 },
    },
    {
      name: "Smartwatch with Heart Monitor",
      description: "Advanced smartwatch with health monitoring features and fitness tracking.",
      price: 199.99,
      sku: "SW-001",
      inventory: { quantity: 30 },
    },
        {
      name: "Portable Bluetooth Speaker",
      description: "Compact yet powerful Bluetooth speaker perfect for outdoor adventures.",
      price: 89.99,
      sku: "SP-001",
      inventory: { quantity: 40 },
    },
    {
      name: "Ergonomic Mechanical",
      description: "",
      price: 149.99,
      sku: "EM-001",
      inventory: { quantity: 100 },
    },
    {
      name: "4K Webcam",
      description: "",
      price: 99.99,
      sku: "RS-001",
      inventory: { quantity: 60 },
    },
    {
      name: "Power Bank 20000mAh",
      description: "",
      price: 60,
      sku: "LB-001",
      inventory: { quantity: 70 },
    },
  ];

  for (const p of products) {
    await prisma.product.create({
      data: {
        name: p.name,
        description: p.description,
        price: p.price,
        sku: p.sku,
        inventory: {
          create: {
            quantity: p.inventory.quantity,
          },
        },
      },
    });
  }

  console.log("Seeded all 6 products successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
