import { Suspense } from "react";
import SkeletonTopic from "@/components/skeleton-topic";
import UserTopics from "@/components/user-topics";

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

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ author: string }>;
  searchParams: Promise<{ page: number }>;
}) {
  const author = (await params).author;
  const { page: pageNumber } = await searchParams;

  return (
    <main className="container mt-8">
      <section className="mx-auto w-full max-w-[1100px]">
        <div>
          <h1 className="text-4xl font-bold capitalize">{author}</h1>
          <div className="mt-1 h-[2px] w-[5%] rounded-full bg-gradient-to-br from-primary to-background"></div>
        </div>

        <div className="mt-10 grid grid-cols-[auto_1fr] items-center gap-5">
          <div className="h-[25px] w-1 bg-primary sm:h-[25px]"></div>
          <h2 className="text-xl font-medium">Publicações:</h2>
        </div>

        <Suspense fallback={<SkeletonTopic />}>
          <UserTopics author={author} pageNumber={pageNumber} />
        </Suspense>
      </section>
    </main>
  );
}
