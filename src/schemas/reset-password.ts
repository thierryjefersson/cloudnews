import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(8, "A senha deve conter pelo menos 8 caracteres")
      .max(30, "Senha deve conter no máximo 30 caracteres"),
    confirmPassword: z.string().min(1, "Confirmação de senha é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas são incompatíveis",
    path: ["confirmPassword"],
  });

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
