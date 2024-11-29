import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  await prisma.shopInfo.createMany({
    data: [
      {
        name: 'Shop 1',
        email: 'shop1@example.com',
        contactEmail: 'contact1@example.com',
        phone: '1234567890',
        shopOwnerName: 'Owner 1',
        url: 'https://shop1.com',
        myshopifyDomain: 'shop1.myshopify.com',
        address: '123 Main St, City, Country',
        country: 'Country 1',
        shopDetail: { key: 'value' },
      },
      {
        name: 'Shop 2',
        email: 'shop2@example.com',
        contactEmail: 'contact2@example.com',
        phone: '0987654321',
        shopOwnerName: 'Owner 2',
        url: 'https://shop2.com',
        myshopifyDomain: 'shop2.myshopify.com',
        address: '456 Another St, City, Country',
        country: 'Country 2',
        shopDetail: { key: 'value' },
      },
    ],
  });

  console.log('Seed data inserted');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

