import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FinishOrder } from "@/actions/finish-order";

import { getCartQueryKey } from "../queries/use-cart";

export const getFinishOrder = () => ["finish-order"] as const;

export const useFinishOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getFinishOrder(),
    mutationFn: async () => {
      return await FinishOrder();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCartQueryKey });
    },
  });
};
