import { X } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-8 pb-24">
      <div className="flex items-center gap-4">
        <X size={30} />
        <div className="h-6 w-0.5 bg-primary"></div>
        <p className="text-2xl">404</p>
      </div>
      <h2 className="text-3xl font-semibold md:text-4xl">
        Página não encontrada
      </h2>
      <Link
        className="text-primary underline-offset-4 hover:underline"
        href="/"
      >
        Retornar à tela inicial
      </Link>
    </div>
  );
}
