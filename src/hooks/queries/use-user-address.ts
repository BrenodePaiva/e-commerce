import { useQuery } from "@tanstack/react-query";

import { getUserAddress } from "@/actions/get-user-address";
import { shippingAddressTable } from "@/db/schema";

export const getUserAddressQueryKey = ["user-address"] as const;

export const useUserAddress = (params?: {
  initialData?: (typeof shippingAddressTable.$inferSelect)[];
}) => {
  return useQuery({
    queryKey: getUserAddressQueryKey,
    queryFn: () => getUserAddress(),
    initialData: params?.initialData,
  });
};
