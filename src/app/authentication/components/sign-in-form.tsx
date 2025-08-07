import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

const formSchema = z.object({
  email: z.email("e-mail inválido."),
  password: z.string().min(8, "senha muito pequena."),
});

type formValues = z.infer<typeof formSchema>;

const SignIn = () => {
  const router = useRouter();
  const form = useForm<formValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: formValues) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          if (
            ctx.error.code === "INVALID_EMAIL_OR_PASSWORD" ||
            ctx.error.code === "USER_NOT_FOUND"
          ) {
            toast.error("E-mail ou senha inválido.");
            form.setError("email", {
              message: "E-mail ou senha inválido.",
            });
            return form.setError("password", {
              message: "E-mail ou senha inválido.",
            });
          }
          toast.error(ctx.error.message);
        },
      },
    });
  }

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça login para continuar</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="grid gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite seu e-mail" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </CardFooter>
          <CardFooter>
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleSignInWithGoogle}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  fill="#4285F4"
                  d="M128 48c22 0 41 8 55 21l41-41C198 8 165 0 128 0 78 0 35 29 14 72l48 37c13-39 50-61 66-61z"
                />
                <path
                  fill="#34A853"
                  d="M14 72c-9 18-14 38-14 58s5 40 14 58l48-37c-6-18-6-38 0-56L14 72z"
                />
                <path
                  fill="#FBBC05"
                  d="M128 256c37 0 70-14 94-38l-48-38c-13 10-30 16-46 16-26 0-49-15-61-37l-48 37c21 43 64 72 114 72z"
                />
                <path
                  fill="#EA4335"
                  d="M222 128c0-9-1-18-3-26H128v52h53c-5 14-15 26-28 34l48 38c28-26 44-64 44-98z"
                />
              </svg>

              <p>
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
              </p>
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default SignIn;
