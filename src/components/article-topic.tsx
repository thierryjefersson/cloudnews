import formatDate from "@/functions/format-date";
import { Topic } from "@/schemas/topics";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function ArticleTopic({ topic }: { topic: Topic }) {
  const { author, slug, title, views, createdAt } = topic;

  return (
    <article className="flex flex-col gap-1 border-b border-muted py-5">
      <div
        aria-label="Contagem de visualizações"
        className="flex items-center justify-start gap-1 text-xs text-muted-foreground"
      >
        <Eye size={14} /> {views}
      </div>
      <Link
        aria-label="título"
        href={`/${author.name}/${slug}`}
        className="line-clamp-4 font-semibold underline-offset-2 hover:underline"
      >
        {title}
      </Link>
      <div className="flex items-center justify-start gap-3 text-xs text-muted-foreground">
        <Link
          aria-label="autor"
          href={`/${author.name}`}
          className="underline-offset-2 hover:underline"
        >
          @{author.name}
        </Link>
        <span>{formatDate(createdAt)}</span>
      </div>
    </article>
  );
}
