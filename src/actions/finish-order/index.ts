"use server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { db } from "@/db";
import { cartItemTable, orderItemTable, orderTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export const FinishOrder = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    throw new Error("Unauthorized");
  }

  const cart = await db.query.cartTable.findFirst({
    with: {
      shippingAddress: true,
      items: {
        with: {
          productVariant: true,
        },
      },
    },
  });

  if (!cart?.shippingAddress) {
    throw new Error("Shipping address not found");
  }

  const totalPriceInCents = cart.items.reduce(
    (acc, item) => acc + item.productVariant.priceInCents * item.quantity,
    0,
  );

  let orderId: string | undefined;

  await db.transaction(async (tx) => {
    if (!cart.shippingAddress) {
      throw new Error("Cart shipping address not found");
    }
    const [order] = await tx
      .insert(orderTable)
      .values({
        recipientName: cart.shippingAddress.recipientName,
        street: cart.shippingAddress.street,
        number: cart.shippingAddress.number,
        complement: cart.shippingAddress.complement,
        city: cart.shippingAddress.city,
        state: cart.shippingAddress.state,
        neighborhood: cart.shippingAddress.neighborhood,
        zipCode: cart.shippingAddress.zipCode,
        country: cart.shippingAddress.country,
        phone: cart.shippingAddress.phone,
        email: cart.shippingAddress.email,
        cpfOrCnpj: cart.shippingAddress.cpfOrCnpj,
        userId: session.user.id,
        totalPriceInCents,
        shippingAddressId: cart.shippingAddress!.id,
      })
      .returning();

    if (!order) {
      throw new Error("Falied to create order");
    }
    orderId = order.id;

    const orderItemsPayload: Array<typeof orderItemTable.$inferInsert> =
      cart.items.map((item) => ({
        orderId: order.id,
        productVariantId: item.productVariant.id,
        quantity: item.quantity,
        priceInCents: item.productVariant.priceInCents,
      }));

    await tx.insert(orderItemTable).values(orderItemsPayload);
    await tx.delete(cartItemTable).where(eq(cartItemTable.cartId, cart.id));
  });

  if (!orderId) {
    throw new Error("Falied to create order");
  }
  return { orderId };
};
