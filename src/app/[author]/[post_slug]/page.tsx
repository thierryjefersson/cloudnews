import getPost from "@/app/_get-posts/get-post";
import NotFound from "@/app/not-found";
import ArticlePost from "@/components/article-post";
import ButtonDeletePost from "@/components/button-delete-post";
import Loading from "@/components/loading";
import formatDate from "@/functions/format-date";
import readingTime from "@/functions/reading-time";
import Link from "next/link";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ author: string }>;
}) {
  const author = (await params).author;
  return {
    title: `${author ? author + " | CloudNews" : "CloudNews"}`,
  };
}

async function Post({
  params,
}: {
  params: Promise<{ author: string; post_slug: string }>;
}) {
  const { author, post_slug } = await params;

  const post = await getPost(author, post_slug);

  if (!post) return <NotFound />;
  return (
    <main className="container pb-6">
      <article className="mx-auto mt-6 flex max-w-[900px] flex-col gap-2 border-l border-dotted border-l-gray-200 pl-4 dark:border-l-gray-700 md:pl-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Link
              href={`/${author}`}
              className="rounded-md bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary underline-offset-2 hover:underline dark:bg-primary/40"
            >
              {author}
            </Link>
            <span>{readingTime(post.body)} min de leitura</span>
            {"·"}
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <ButtonDeletePost author={author} slug={post.slug} />
        </div>
        <h1 className="text-4xl font-bold">{post.title}</h1>
        <ArticlePost body={post.body} />
      </article>
    </main>
  );
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ author: string; post_slug: string }>;
}) {
  return (
    <Suspense fallback={<Loading />}>
      <Post params={params} />
    </Suspense>
  );
}
