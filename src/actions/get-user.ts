"use server";

import verifyToken from "@/functions/verify-token";
import { cookies } from "next/headers";

export default async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;
  const { isValid, name } = (await verifyToken(token)) as {
    isValid: boolean;
    name?: string;
  };

  return isValid && name ? name : null;
}
