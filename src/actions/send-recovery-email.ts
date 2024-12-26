"use server";

import { RecuperarSchema } from "@/schemas/recuperar";

export default async function sendRecoveryEmail(data: RecuperarSchema) {
  try {
    await fetch("http://localhost:3333/api/users/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
}
