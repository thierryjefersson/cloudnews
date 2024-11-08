"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { createUserSchema, CreateUserSchema } from "@/schemas/cadastrar";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessageInput from "./error.message-input";
import { useState, useTransition } from "react";
import createUser from "@/actions/create-user";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function CadastrarForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [isHidden, setIsHidden] = useState(true);
  const route = useRouter();
  const { toast } = useToast();

  async function handleCadastrar(formData: CreateUserSchema) {
    setError("");
    startTransition(async () => {
      const response = await createUser(formData);
      if (response && response.message) return setError(response.message);

      toast({
        title:
          "Huooh, que ótimo que você concluiu o cadastro em nossa plataforma!",
        description:
          "Agora chegou o momento de efetuar o login, insira suas credenciais",
        duration: 20000,
      });

      route.push("/login");
    });
  }

  return (
    <form onSubmit={handleSubmit(handleCadastrar)} className="mt-5 space-y-4">
      <div>
        <Label htmlFor="name">Usuário</Label>
        <Input
          placeholder="Cloudnews"
          id="name"
          autoComplete="off"
          {...register("name")}
        />
        <span className="pl-1 text-xs tracking-wide text-gray-400 dark:text-gray-300">
          Esse nome será exibido publicamente.
        </span>
        {errors.name?.message && (
          <ErrorMessageInput text={errors.name?.message} />
        )}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          placeholder="cloudnews@cloudnews.com"
          id="email"
          autoComplete="off"
          {...register("email")}
        />
        {errors.email?.message && (
          <ErrorMessageInput text={errors.email?.message} />
        )}
      </div>
      <div>
        <Label htmlFor="password">Senha</Label>

        <Input
          type="password"
          placeholder="********"
          id="password"
          autoComplete="off"
          {...register("password")}
        />

        {errors.password?.message && (
          <ErrorMessageInput text={errors.password?.message} />
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirmar a senha</Label>
        <div className="relative">
          <Input
            type={isHidden ? "password" : "text"}
            placeholder="********"
            id="confirmPassword"
            autoComplete="off"
            {...register("confirmPassword")}
          />
          <Button
            type="button"
            size={"icon"}
            variant={"ghost"}
            className="absolute right-2 top-0 rounded-full"
            onClick={() => setIsHidden((prev) => !prev)}
          >
            {isHidden ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {errors.confirmPassword?.message && (
          <ErrorMessageInput text={errors.confirmPassword?.message} />
        )}
      </div>
      {error && <ErrorMessageInput text={error} />}

      <Button disabled={isPending} className="w-full">
        {isPending ? "Carregando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
