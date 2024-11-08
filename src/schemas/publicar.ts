import z from "zod";

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Título é obrigatório")
    .min(5, "Título muito curto, deve conter no mínimo 5 caracteres")
    .max(150, "Título muito grande, deve conter no máximo 150 caracteres"),
  body: z
    .string({ message: "Corpo da publicação é obrigatório" })
    .min(1, "Corpo da publicação é obrigatório")
    .min(20, "Conteúdo muito curto, deve conter no mínimo 20 caracteres"),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;
