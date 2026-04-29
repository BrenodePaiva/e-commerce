import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { ProductItemSkeleton } from "@/components/common/product-item";
import { db } from "@/db";
import { categoryTable } from "@/db/schema";

import CategoryContent from "./components/category-content";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const category = await db.query.categoryTable.findFirst({
    where: eq(categoryTable.slug, slug),
  });
  if (!category) {
    return notFound();
  }
  return (
    <div className="space-y-6 px-5">
      <h2 className="text-xl font-semibold">{category.name}</h2>
      <div className="grid grid-cols-2 gap-4 lg:flex lg:flex-wrap lg:gap-y-7">
        <Suspense fallback={<ProductItemSkeleton />}>
          <CategoryContent categoryId={category.id} />
        </Suspense>
      </div>
    </div>
  );
};
export default CategoryPage;
