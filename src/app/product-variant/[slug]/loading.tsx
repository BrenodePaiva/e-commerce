import { ProductListSkeleton } from "@/components/common/product-list";
import { Skeleton } from "@/components/ui/skeleton";

import { ProductActionsSkeleton } from "./components/product-actions";
import { VariantSelectorSkeleton } from "./components/variant-selector";

const Loading = () => {
  return (
    <>
      <div className="flex flex-col space-y-5 md:flex-row md:p-5 lg:justify-center lg:gap-5">
        <div>
          <div className="relative aspect-square w-full md:h-[500px] md:w-[500px] lg:h-[600px] lg:w-[600px]">
            <Skeleton className="h-full w-full"></Skeleton>
          </div>
        </div>

        <div>
          <div className="md:flex md:flex-col-reverse">
            <div className="my-5 px-5">
              <VariantSelectorSkeleton />
            </div>

            <div className="px-5">
              <Skeleton className="h-6 w-28"></Skeleton>

              <Skeleton className="h-4 w-16"></Skeleton>

              <Skeleton className="h-6 w-20"></Skeleton>
            </div>
          </div>

          <ProductActionsSkeleton />

          <div className="my-3 px-5">
            <Skeleton className="h-4 w-72"></Skeleton>
          </div>
        </div>
      </div>
      <div className="mt-7">
        <ProductListSkeleton />
      </div>
    </>
  );
};

export default Loading;
