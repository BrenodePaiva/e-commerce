"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

const CheckoutSuccessPage = () => {
  return (
    <>
      <div className="h-[calc(100vh-195px)] lg:h-[calc(100vh-265px)]"></div>
      <Dialog open={true} onOpenChange={() => {}}>
        <DialogContent className="text-center">
          <Image
            src={"/illustration.svg"}
            alt="Success"
            width={300}
            height={300}
            className="mx-auto"
          />
          <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>
          <DialogDescription className="font-medium">
            Seu pedido foi efetuado com sucesso. Você pode acompanhar o status
            na seção de “Meus Pedidos”.
          </DialogDescription>

          <DialogFooter>
            <Button className="rounded-full sm:flex-1" size="lg" asChild>
              <Link href="/my-orders">Ver meus pedidos</Link>
            </Button>
            <Button
              className="rounded-full sm:flex-1"
              size="lg"
              variant="outline"
              asChild
            >
              <Link href="/">Voltar para loja</Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CheckoutSuccessPage;
