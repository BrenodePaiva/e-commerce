import { CategorySelectorSkeleton } from "@/components/common/category-selector";
import { ProductListSkeleton } from "@/components/common/product-list";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <div className="space-y-6">
        <div className="px-5 md:hidden">
          <Skeleton className="h-[800px] w-full bg-gray-200"></Skeleton>
        </div>

        <div className="m-auto mb-6 hidden max-w-[900px] px-5 md:block">
          <Skeleton className="h-[500px] w-full bg-gray-200"></Skeleton>
        </div>

        <ProductListSkeleton />

        <div className="px-5 lg:hidden">
          <CategorySelectorSkeleton />
        </div>

        <div className="lg:flex lg:flex-row-reverse lg:items-end lg:justify-end">
          <div className="mb-5 px-5 md:hidden">
            <Skeleton className="h-[590px] w-full"></Skeleton>
          </div>

          <div className="hidden w-full max-w-[800px] px-5 md:m-auto md:block lg:m-0">
            <Skeleton className="h-[428px] w-full"></Skeleton>
          </div>

          <ProductListSkeleton textContainerClassName="lg:h-[550px] lg:flex-col" />
        </div>
      </div>
    </>
  );
};

export default Loading;
