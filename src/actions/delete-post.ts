"use server";

import verifyToken from "@/functions/verify-token";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function deletePost({
  author,
  post_slug,
}: {
  author: string;
  post_slug: string;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  try {
    const { isValid } = (await verifyToken(token)) as {
      isValid: boolean;
      name?: string;
    };
    if (!isValid) throw new Error("Não autorizado a deletar a postagem");
    if (!author || !post_slug) throw new Error("Postagem não encontrada");

    const response = await fetch(
      `http://localhost:3333/api/posts/${author}/${post_slug}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      },
    );
    if (!response.ok) throw new Error("Erro ao excluir a postagem");

    revalidateTag("posts");
    revalidateTag("post");
  } catch (error) {
    return {
      message:
        error instanceof Error ? error.message : "Erro ao excluir a postagem",
    };
  }
}
