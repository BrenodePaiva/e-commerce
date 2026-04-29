import Link from "next/link";

import { categoryTable } from "@/db/schema";

import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6 lg:bg-white lg:pt-1 lg:pb-0">
      <div className="grid grid-cols-2 gap-3 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-6">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="secondary"
            className="rounded-full bg-white text-xs font-semibold"
            asChild
          >
            <Link href={`/category/${category.slug}`}>{category.name}</Link>
          </Button>
        ))}
      </div>
    </div>
  );
};

export const CategorySelectorSkeleton = () => {
  return (
    <div className="rounded-3xl bg-[#F4EFFF] p-6 lg:bg-white lg:pt-1 lg:pb-0">
      <div className="grid grid-cols-2 gap-3 lg:flex lg:w-full lg:items-center lg:justify-center lg:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex h-9 w-full items-center justify-center rounded-full px-4 py-2"
          >
            <Skeleton className="h-4 w-36 bg-gray-300"></Skeleton>
          </Skeleton>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
