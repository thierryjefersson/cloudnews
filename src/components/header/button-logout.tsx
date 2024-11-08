"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useTransition } from "react";
import logout from "@/actions/logout";

export default function ButtonLogout() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      disabled={isPending}
      variant="destructive"
      className="w-full text-sm"
      onClick={() => startTransition(async () => await logout())}
    >
      <LogOut size={18} />
      Deslogar
    </Button>
  );
}
