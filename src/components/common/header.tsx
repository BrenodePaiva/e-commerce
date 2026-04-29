"use client";
import { Handbag, LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { categoryTable } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";
import CategorySelector from "./category-selector";

interface CategoriesProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

export const Header = ({ categories }: CategoriesProps) => {
  const { data: session } = authClient.useSession();
  const navigate = useRouter();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate.push("/");
  };

  return (
    <>
      <header className="flex flex-col p-5 lg:mb-6 lg:border-b lg:border-solid">
        <div className="flex items-center justify-between">
          <div className="hidden lg:block">
            {session?.user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-card p-1">
                      <div className="flex items-center gap-2">
                        {session.user.image && (
                          <Avatar>
                            <AvatarImage
                              src={session.user.image}
                              sizes="34px"
                            />
                          </Avatar>
                        )}

                        <p className="font-bold">{session.user.name}</p>
                      </div>
                    </NavigationMenuTrigger>

                    <NavigationMenuContent className="space-y-2">
                      <NavigationMenuLink className="border-b border-solid">
                        {session.user.email}
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-0" asChild>
                        <Link
                          href="/my-orders"
                          className="flex flex-row items-center gap-2 px-3 py-2 font-semibold"
                        >
                          <Handbag size={18} />
                          Ver meus pedidos
                        </Link>
                      </NavigationMenuLink>
                      <NavigationMenuLink className="p-0">
                        <Button
                          className="justify-start px-3 py-2"
                          variant="ghost"
                          onClick={handleSignOut}
                        >
                          <LogOutIcon size={18} />
                          Sair da conta
                        </Button>
                      </NavigationMenuLink>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : (
              <div className="flex items-center gap-3">
                <h2 className="font-semibold">Olá. Faça login!</h2>
                <Button size="icon" asChild variant="outline">
                  <Link href="/authentication">
                    <LogInIcon />
                  </Link>
                </Button>
              </div>
            )}
          </div>

          <Link href="/">
            <Image src="/Logo.svg" alt="Bewear" width={100} height={26.14} />
          </Link>

          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <MenuIcon />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="px-5">
                    {session?.user ? (
                      <>
                        <div className="mb-6 flex justify-between border-b pb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={session?.user?.image as string | undefined}
                              />
                              <AvatarFallback>
                                {session?.user?.name?.split(" ")[0][0]}
                                {session?.user?.name?.split(" ")[1]?.[0]}
                              </AvatarFallback>
                            </Avatar>

                            <div>
                              <h3 className="font-semibold">
                                {session?.user?.name}
                              </h3>
                              <span className="text-muted-foreground block text-xs">
                                {session?.user?.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <SheetClose asChild>
                          <Link href="/my-orders">
                            <Button
                              className="w-full justify-start p-0"
                              variant="ghost"
                            >
                              <Handbag size={18} />
                              Ver meus pedidos
                            </Button>
                          </Link>
                        </SheetClose>

                        <Button
                          className="w-full justify-start p-0"
                          variant="ghost"
                          onClick={handleSignOut}
                        >
                          <LogOutIcon size={18} />
                          Sair da conta
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center justify-between">
                        <h2 className="font-semibold">Olá. Faça login!</h2>
                        <SheetClose asChild>
                          <Button size="icon" asChild variant="outline">
                            <Link href="/authentication">
                              <LogInIcon />
                            </Link>
                          </Button>
                        </SheetClose>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <Cart />
          </div>
        </div>
        <div className="hidden px-5 lg:block">
          <CategorySelector categories={categories} />
        </div>
      </header>
    </>
  );
};
