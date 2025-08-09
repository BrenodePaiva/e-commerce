import { useQuery } from "@tanstack/react-query";

import { getCart } from "@/actions/get-cart";

export const getCartQueryKey = ["cart"] as const;

export const useCart = () => {
  return useQuery({
    queryKey: getCartQueryKey,
    queryFn: () => getCart(),
  });
};
