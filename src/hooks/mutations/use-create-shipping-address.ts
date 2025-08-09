import { useMutation, useQueryClient } from "@tanstack/react-query";

import { creatShippingAddress } from "@/actions/create-shipping-address";

import { getUserAddressQueryKey } from "../queries/use-user-address";

export const getCreateShippingAddressMutationKey = () =>
  ["create-shipping-address"] as const;

export const useCreateShippingAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: getCreateShippingAddressMutationKey(),
    mutationFn: creatShippingAddress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserAddressQueryKey });
    },
  });
};
