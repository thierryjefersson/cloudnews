"use server";

export default async function resetPassword(data: {
  resetToken: string;
  password: string;
}) {
  try {
    const response = await fetch(
      "http://localhost:3333/api/users/reset-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      },
    );
    if (!response.ok) throw new Error("Link expirado, autenticação falhou!");
  } catch (err) {
    return {
      message:
        err instanceof Error
          ? err.message
          : "Erro desconhecido ao efetuar a alteração da senha",
    };
  }
}
