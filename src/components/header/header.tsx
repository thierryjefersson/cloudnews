import { CloudLightning } from "lucide-react";
import Link from "next/link";
import UserButton from "./user-button";
import { ThemeDropdown } from "../theme/theme-dropdown";

export default function Header() {
  return (
    <header className="bg-secondary dark:bg-primary">
      <nav className="container flex w-full items-center justify-between px-4 py-2">
        <Link
          href="/"
          className="flex items-center gap-1 p-1 text-primary dark:text-primary-foreground"
        >
          <CloudLightning size={30} />
          <span className="font-bold">CloudNews</span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeDropdown />
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
