"use client";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import AddToCartButton from "./add-to-cart-button";

interface ProductActionsProps {
  productVariantId: string;
}

const ProductActions = ({ productVariantId }: ProductActionsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  return (
    <>
      <div className="px-5">
        <div className="space-y-2">
          <h3 className="mt-5 font-medium">Quantidade</h3>

          <div className="flex w-[100px] items-center justify-between rounded-xl border">
            <Button size="icon" variant="ghost" onClick={handleDecrement}>
              <MinusIcon />
            </Button>

            <p>{quantity}</p>
            <Button size="icon" variant="ghost" onClick={handleIncrement}>
              <PlusIcon />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-col space-y-4 px-5 lg:flex-row lg:gap-5">
        <AddToCartButton
          productVariantId={productVariantId}
          quantity={quantity}
        />
        <Button className="rounded-full" size="lg">
          Comprar agora
        </Button>
      </div>
    </>
  );
};

export const ProductActionsSkeleton = () => {
  return (
    <>
      <div className="px-5">
        <div className="space-y-2">
          <Skeleton className="mt-5 h-5 w-28"></Skeleton>

          <Skeleton className="h-[38px] w-[100px] rounded-xl"></Skeleton>
        </div>
      </div>

      <div className="mt-5 flex flex-col space-y-4 px-5 lg:flex-row lg:gap-5">
        <Skeleton className="flex h-12 items-center justify-center rounded-full px-6 py-4">
          <Skeleton className="h-4 w-28 bg-gray-300"></Skeleton>
        </Skeleton>

        <Skeleton className="flex h-12 items-center justify-center rounded-full px-6 py-4">
          <Skeleton className="h-4 w-28 bg-gray-300"></Skeleton>
        </Skeleton>

        {/* <Skeleton className="flex items-center justify-center rounded-full px-6 py-4">
          <Skeleton className="h-4 w-28 bg-gray-300"></Skeleton>
        </Skeleton> */}
      </div>
    </>
  );
};

export default ProductActions;
