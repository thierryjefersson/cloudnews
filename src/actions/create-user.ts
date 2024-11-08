"use server";

import { CreateUserSchema } from "@/schemas/cadastrar";

export default async function createUser(formData: CreateUserSchema) {
  try {
    const { email, name, password } = formData;
    const response = await fetch("http://localhost:3333/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });
    if (!response.ok) {
      throw new Error(
        response.status === 409
          ? "Email ou usuário informado já está sendo usado"
          : "Erro interno do servidor ao cadastrar conta",
      );
    }
  } catch (err) {
    return {
      message:
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao efetuar o cadastro",
    };
  }
}
