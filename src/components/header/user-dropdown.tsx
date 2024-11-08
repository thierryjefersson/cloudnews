import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Plus, User2Icon } from "lucide-react";
import ModeToggle from "../theme/toggle-mode";
import ButtonLogout from "./button-logout";

export default function UserDropdown({ name }: { name: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="group">
        <Avatar>
          <AvatarFallback className="bg-primary uppercase text-white transition-all group-hover:opacity-60 dark:bg-black dark:group-hover:bg-zinc-600 dark:group-hover:opacity-100">
            {name?.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 p-2">
        <DropdownMenuItem asChild>
          <Link
            href={`/${name}`}
            className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 transition-colors hover:bg-muted"
          >
            <User2Icon size={18} className="flex-shrink-0" />
            <span className="flex-grow truncate text-sm font-normal">
              {name}
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />

        <DropdownMenuItem asChild>
          <Link
            href="/publicar"
            className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1.5 text-sm transition-colors hover:bg-muted"
          >
            <Plus size={18} className="flex-shrink-0" />
            Novo conteúdo
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1.5" />
        <div className="flex justify-center">
          <ModeToggle />
        </div>

        <DropdownMenuSeparator className="my-1.5" />

        <ButtonLogout />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
