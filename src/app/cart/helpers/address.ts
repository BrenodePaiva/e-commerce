export const formatAddress = (address: {
  recipientName: string;
  street: string;
  number: string;
  complement: string | null;
  city: string;
  state: string;
  neighborhood: string;
  zipCode: string;
}) => {
  return `${address.recipientName} . ${address.street},${" "}
                        ${address.number}${" "}
                        ${address.complement && `${address.complement}`},${" "}
                        ${address.neighborhood}, ${address.city} - ${address.state}${" "}
                        . CEP: ${address.zipCode}`;
};
