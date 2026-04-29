"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";
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

export const ProductListSkeleton = ({
  textContainerClassName,
}: {
  textContainerClassName?: string;
}) => {
  return (
    <div className="space-y-6 md:mt-16">
      <Skeleton className="mx-5 h-4 w-32 font-semibold"></Skeleton>
      <div
        className={cn(
          "flex w-full gap-4 overflow-auto px-5 [&::-webkit-scrollbar]:hidden",
          textContainerClassName,
        )}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="h-[200px] w-[200px] rounded-3xl"></Skeleton>
            <Skeleton className="h-4 w-16"></Skeleton>
            <Skeleton className="h-4 w-48"></Skeleton>
            <Skeleton className="h-5 w-20"></Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
