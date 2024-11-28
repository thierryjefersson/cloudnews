import { CloudLightning } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="container py-5 md:py-8">
      <div className="mx-auto flex max-w-[800px] flex-col items-center justify-center gap-1 text-sm text-gray-500 md:flex-row md:gap-6">
        <div className="flex items-center justify-center gap-2">
          <Link href="/" className="group">
            <CloudLightning className="group-hover:text-primary" />
          </Link>
          &copy; {year} CloudNews
        </div>
        <Link
          href="https://github.com/thierryjefersson/cloudnews"
          className="hover:text-primary hover:underline hover:underline-offset-2"
        >
          GitHub
        </Link>
      </div>
    </footer>
  );
}
