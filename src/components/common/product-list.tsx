"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import ProductItem from "./product-item";

interface ProductListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
  textContainerClassName?: string;
}

const ProductList = ({
  title,
  products,
  textContainerClassName,
}: ProductListProps) => {
  return (
    <div className="space-y-6 md:mt-16">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div
        className={cn(
          "flex w-full gap-4 overflow-auto px-5 [&::-webkit-scrollbar]:hidden",
          textContainerClassName,
        )}
      >
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
