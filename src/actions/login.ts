"use server";

import { LoginSchema } from "@/schemas/login";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function login(formData: LoginSchema) {
  const cookieStore = await cookies();
  try {
    const response = await fetch("http://localhost:3333/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(
        response.status === 401
          ? "Credenciais incorretas!"
          : "Erro interno do servidor ao efetuar o login",
      );
    }

    const { accessToken } = await response.json();
    cookieStore.set("access_token", accessToken, {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: "lax",
    });
  } catch (err) {
    cookieStore.delete("access_token");
    return {
      message:
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao efetuar o login",
    };
  }

  redirect("/");
}
