import { ProductItemSkeleton } from "@/components/common/product-item";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-6 px-5">
      <Skeleton className="h-6 w-32 rounded"></Skeleton>
      <ProductItemSkeleton />
    </div>
  );
};

export default Loading;
