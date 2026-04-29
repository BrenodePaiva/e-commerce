import Image from "next/image";
import Link from "next/link";

import { productTable, productVariantTable } from "@/db/schema";
import { formatCentsToBRL } from "@/helpers/money";
import { cn } from "@/lib/utils";

import { Skeleton } from "../ui/skeleton";

interface ProductItemProps {
  product: typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  };
  textContainerClassName?: string;
}

const ProductItem = ({ product, textContainerClassName }: ProductItemProps) => {
  const fristVariant = product.variants[0];

  return (
    <Link
      href={`/product-variant/${fristVariant.slug}`}
      className="flex flex-col gap-4"
    >
      <Image
        src={fristVariant.imageUrl.replace(/["{}]/g, "")}
        alt={fristVariant.name}
        sizes="100vw"
        height={0}
        width={0}
        className="h-auto w-full rounded-3xl lg:w-[250px]"
      />
      <div
        className={cn(
          "flex max-w-[200px] flex-col gap-1",
          textContainerClassName,
        )}
      >
        <p className="truncate text-sm font-medium">{product.name}</p>
        <p
          className={cn(
            "text-foreground truncate text-xs font-medium lg:max-w-[250px]",
            textContainerClassName,
          )}
        >
          {product.description}
        </p>
        <p className="truncate text-sm font-semibold">
          {formatCentsToBRL(fristVariant.priceInCents)}
        </p>
      </div>
    </Link>
  );
};

export const ProductItemSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-y-7">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="flex flex-col gap-3">
          <Skeleton className="h-52 w-full rounded-3xl lg:w-[250px]"></Skeleton>
          <Skeleton className="h-4 w-16"></Skeleton>
          <Skeleton className="h-4 w-3xs"></Skeleton>
          <Skeleton className="h-5 w-20"></Skeleton>
        </div>
      ))}
    </div>
  );
};

export default ProductItem;
