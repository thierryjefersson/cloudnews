"use client";

import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import ErrorMessageInput from "./error.message-input";
import { recuperarSchema, RecuperarSchema } from "@/schemas/recuperar";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import sendRecoveryEmail from "@/actions/send-recovery-email";

export default function RecuperarForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecuperarSchema>({
    resolver: zodResolver(recuperarSchema),
  });

  async function sendEmail(data: RecuperarSchema) {
    startTransition(async () => {
      await sendRecoveryEmail(data);

      toast({
        description: `Caso o e-mail "${data.email}" esteja cadastrado, um link foi enviado para definir uma nova senha.`,
        duration: 1000 * 60,
        className:
          "border-[#4ac26b66] bg-[#dafbe1] dark:bg-[#2ea043] sm:dark:bg-[#2ea04326]",
      });
    });
  }

  return (
    <form onSubmit={handleSubmit(sendEmail)} className="mt-5">
      <div>
        <Label htmlFor="email">Digite seu e-mail</Label>
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
      <Button disabled={isPending} className="mt-3 w-full">
        {isPending ? "Carregando..." : "Recuperar"}
      </Button>
    </form>
  );
}
