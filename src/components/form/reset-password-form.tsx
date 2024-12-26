"use client";

import { useState, useTransition } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  resetPasswordSchema,
} from "@/schemas/reset-password";
import ErrorMessageInput from "./error.message-input";
import resetPassword from "@/actions/reset-password";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [isHidden, setIsHidden] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const route = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function handleResetPassword(data: ResetPasswordSchema) {
    startTransition(async () => {
      const response = await resetPassword({
        resetToken: token,
        password: data.password,
      });

      if (response && response.message) return setError(response?.message);

      toast({
        description: "Senha alterada com sucesso!",
        className:
          "border-[#4ac26b66] bg-[#dafbe1] dark:bg-[#2ea043] sm:dark:bg-[#2ea04326]",
      });

      route.push("/login");
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleResetPassword)}
      className="mt-5 space-y-4"
    >
      <div>
        <Label htmlFor="password">Senha</Label>
        <Input
          type="password"
          placeholder="Crie uma senha"
          id="password"
          autoComplete="off"
          {...register("password")}
        />
        {errors.password?.message && (
          <ErrorMessageInput text={errors.password?.message} />
        )}
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirmação de senha</Label>
        <div className="relative">
          <Input
            aria-label="Confirmação de senha"
            type={isHidden ? "password" : "text"}
            placeholder="Confirme sua senha"
            id="confirmPassword"
            autoComplete="off"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword?.message && (
            <ErrorMessageInput text={errors.confirmPassword?.message} />
          )}
          <Button
            type="button"
            size={"icon"}
            variant={"ghost"}
            title="Mostrar/ocultar senha"
            aria-label="Mostrar/ocultar senha"
            className="absolute right-2 top-0 rounded-full"
            onClick={() => setIsHidden((prev) => !prev)}
          >
            {isHidden ? <EyeOff /> : <Eye />}
          </Button>
        </div>
      </div>
      <Button disabled={isPending} className="w-full">
        {isPending ? "Carregando..." : "Alterar senha"}
      </Button>

      {error && <ErrorMessageInput text={error} />}
    </form>
  );
}
