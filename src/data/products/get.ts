import "server-only";

import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { productTable, productVariantTable } from "@/db/schema";

//DTO (Data Transfer Object)
// interface ProductDto {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   image: string;
//   category: string;
//   createdAt: Date;
// }

export const getProductsWithVariants = async () => {
  const products = await db.query.productTable.findMany({
    with: { variants: true },
  });
  return products;
};

export const getNewlyCreatedProducts = async () => {
  const products = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: { variants: true },
  });
  return products;
};

export const getProductVariant = async (slug:string) => {
  const product = await db.query.productVariantTable.findFirst({
    where: eq(productVariantTable.slug, slug),
    with: {
      product: {
        with: {
          variants: true,
        },
      },
    },
  });
  return product
}

export const getLikelyProducts = async (categoryId:string) => {
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, categoryId),
    with: { variants: true },
  });
  return products
}
