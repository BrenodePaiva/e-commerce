import { useMutation, useQueryClient } from "@tanstack/react-query";

import { addProductToCart } from "@/actions/add-cart-product";

import { getCartQueryKey } from "../queries/use-cart";

export const getIncreaseCartProductMutationKey = (productVariantId: string) =>
  ["increase-cart-product", productVariantId] as const;

export const useIncreaseCartProduct = (productVariantId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getIncreaseCartProductMutationKey(productVariantId),
    mutationFn: () => addProductToCart({ productVariantId, quantity: 1 }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartQueryKey });
    },
  });
};
