"use server";

import verifyToken from "@/functions/verify-token";
import { CreatePostSchema } from "@/schemas/publicar";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function createPost(formData: CreatePostSchema) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  try {
    const { isValid } = (await verifyToken(token)) as {
      isValid: boolean;
      name?: string;
    };
    if (!isValid)
      throw new Error("Não possui autorização para prosseguir com a ação");
    const response = await fetch("http://localhost:3333/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formData),
    });
    if (response.status === 409)
      throw new Error("Uma postagem com esse título já existe em seu perfil");

    if (response.status === 201) revalidateTag("posts");
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Erro ao concluir ação",
    };
  }
}
