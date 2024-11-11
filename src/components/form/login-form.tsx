"use client";

import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LoginSchema, loginSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import ErrorMessageInput from "./error.message-input";
import login from "@/actions/login";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  async function handleLogin(formData: LoginSchema) {
    setError("");
    startTransition(async () => {
      const response = await login(formData);
      if (response && response.message) setError(response.message);
    });
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="mt-5 space-y-4">
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
        <div className="relative">
          <Label htmlFor="password">Senha</Label>
          <Input
            type={isHidden ? "password" : "text"}
            placeholder="********"
            id="password"
            autoComplete="off"
            {...register("password")}
          />
          <Button
            type="button"
            size={"icon"}
            variant={"ghost"}
            title="Mostrar/ocultar senha"
            aria-label="Mostrar/ocultar senha"
            className="absolute right-2 top-6 rounded-full"
            onClick={() => setIsHidden((prev) => !prev)}
          >
            {isHidden ? <EyeOff /> : <Eye />}
          </Button>
        </div>
        {errors.password?.message && (
          <ErrorMessageInput text={errors.password?.message} />
        )}
        {error && <ErrorMessageInput text={error} />}
      </div>

      <Button disabled={isPending} className="w-full">
        {isPending ? "Carregando..." : "Entrar"}
      </Button>
    </form>
  );
}
