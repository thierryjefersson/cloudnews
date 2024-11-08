"use client";

import { useUser } from "@/context/user-context";
import { User2 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserDropdown from "./user-dropdown";

export default function UserButton() {
  const { name } = useUser();
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/login/cadastrar") return;
  return (
    <div>
      {name ? (
        <UserDropdown name={name} />
      ) : (
        <Link
          aria-label="Efetuar login e cadastro"
          className="flex items-center gap-1 text-sm"
          href="/login"
        >
          Login/Criar
          <User2 size={20} />
        </Link>
      )}
    </div>
  );
}
