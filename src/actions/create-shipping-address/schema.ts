import { z } from "zod";

export const creatShippingAddressSchema = z.object({
  email: z.email("e-mail inválido."),
  fullName: z.string("nome inválido.").trim().min(1, "nome é obrigatório"),
  cpf: z.string().min(14, "CPF inválido"),
  phone: z.string().min(15, "Celular inválido"),
  zipCode: z.string().min(9, "CEP inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  number: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatório"),
  state: z.string().min(1, "Estado é obrigatório"),
});

export type CreatShippingAddressSchema = z.infer<
  typeof creatShippingAddressSchema
>;
