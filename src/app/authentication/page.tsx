"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SignIn from "./components/sign-in-form";
import SignUp from "./components/sign-up-form";

const Authentication = () => {
  return (
    <div className="mx-auto max-w-[500px]">
      <div className="flex w-full flex-col gap-6 p-5">
        <Tabs defaultValue="sign-in">
          <TabsList>
            <TabsTrigger value="sign-in">Entrar</TabsTrigger>
            <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignIn />
          </TabsContent>
          <TabsContent value="sign-up">
            <SignUp />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Authentication;
