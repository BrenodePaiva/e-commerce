import { eq } from "drizzle-orm";

import ProductItem from "@/components/common/product-item";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const CategoryContent = async ({ categoryId }: { categoryId: string }) => {
  const products = await db.query.productTable.findMany({
    where: eq(productTable.categoryId, categoryId),
    with: { variants: true },
  });
  return (
    <>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          textContainerClassName="max-w-full whitespace-normal"
        />
      ))}
    </>
  );
};

export default CategoryContent;
