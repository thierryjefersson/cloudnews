import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Pagination({
  search,
  page,
  totalPages,
}: {
  search?: string;
  page: number;
  totalPages: number;
}) {
  function generateLink(page: number) {
    return `${search ? "?search=" + encodeURIComponent(search) + "&" : "?"}page=${page}`;
  }

  return (
    <>
      {page === totalPages && totalPages > 1 && (
        <div className="mx-auto mt-4 w-full max-w-[1100px] px-6 text-sm text-primary underline-offset-4 hover:underline">
          <Link href="/">Fim dos conteúdos, voltar para a página inicial</Link>
        </div>
      )}
      {totalPages <= 1 && (
        <div className="mx-auto mt-8 w-full max-w-[1100px] px-6 pb-6 text-center text-sm text-zinc-500">
          Fim dos conteúdos
        </div>
      )}
      {totalPages > 1 && (
        <div className="mx-auto my-10 flex max-w-[600px] items-center justify-center gap-6">
          <Link
            data-disabled={page <= 1}
            className="group flex gap-1 underline-offset-4 hover:underline data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
            href={generateLink(page > 1 ? page - 1 : 1)}
          >
            <ChevronLeft className="text-primary transition-transform group-hover:-translate-x-1" />
            Anterior
          </Link>
          <Link
            data-disabled={page >= totalPages}
            className="group flex gap-1 underline-offset-4 hover:underline data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50"
            href={generateLink(page < totalPages ? page + 1 : totalPages)}
          >
            Próximo
            <ChevronRight className="text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      )}
    </>
  );
}
