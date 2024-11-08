import getPosts from "@/app/_get-posts/get-posts";
import NotFound from "@/app/not-found";
import ArticleTopic from "./article-topic";
import Pagination from "./pagination";

export default async function UserTopics({
  author,
  pageNumber,
}: {
  author: string;
  pageNumber: number;
}) {
  const result = await getPosts(pageNumber, author);

  if (!result) return NotFound();
  const { topics, page, total_pages } = result;

  return (
    <>
      <div className="mt-4 flex flex-col">
        {topics.map((topic) => (
          <ArticleTopic topic={topic} key={topic.id} />
        ))}
      </div>
      <Pagination page={page} totalPages={total_pages} />
    </>
  );
}
