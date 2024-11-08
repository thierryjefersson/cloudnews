import { z } from "zod";

export const createUserSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email é obrigatório")
      .max(60, "Email deve conter no máximo 60 caracteres")
      .email("Preencha um email válido"),
    name: z
      .string()
      .min(1, "Usuário é obrigatório")
      .max(30, "Usuário deve conter no máximo 30 caracteres")
      .refine((name) => name.trim().length > 0, "Usuário é obrigatório"),
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

export type CreateUserSchema = z.infer<typeof createUserSchema>;
