import "server-only";
import { jwtVerify } from "jose";

export default async function verifyToken(token: string | undefined) {
  if (!token) return { isValid: false };
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET),
      {
        algorithms: ["HS256"],
      },
    );
    if (payload) {
      const { name } = payload as { name: string };
      return { isValid: true, name };
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return { isValid: false };
  }
}
