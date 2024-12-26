import { z } from "zod";

export const recuperarSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .max(60, "Email deve conter no máximo 60 caracteres")
    .email("Preencha um email válido"),
});

export type RecuperarSchema = z.infer<typeof recuperarSchema>;
