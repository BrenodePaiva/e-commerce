import { useQuery } from "@tanstack/react-query";

import { getUserAddress } from "@/actions/get-user-address";

export const getUserAddressQueryKey = ["user-address"] as const;

export const useUserAddress = () => {
  return useQuery({
    queryKey: getUserAddressQueryKey,
    queryFn: () => getUserAddress(),
  });
};
