import ArticleTopic from "@/components/article-topic";
import SearchForm from "@/components/form/search-form";
import getPosts from "./_get-posts/get-posts";
import Pagination from "@/components/pagination";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>;
}) {
  const search = (await searchParams).search;
  return {
    title: `${search ? search : "Página inicial"} | CloudNews`,
    description:
      "Tudo sobre tecnologia você encontra na CloudNews, postagens e interações com a comunidade",
  };
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: number }>;
}) {
  const { search, page: pageNumber } = await searchParams;

  const result = await getPosts(pageNumber, "", search);
  if (!result) return;
  const { topics, page, total_pages } = result;

  return (
    <main>
      <section className="container">
        <SearchForm search={search} />

        <div className="mx-auto my-4 grid w-full max-w-[1100px] grid-cols-[auto_1fr] items-center gap-5">
          <div className="h-[40px] w-1 bg-primary sm:h-[25px]"></div>
          <h1 className="line-clamp-3 text-xl font-bold sm:line-clamp-2">
            {search
              ? `Resultados da pesquisa para "${search.toUpperCase().replaceAll("%20", " ")}" `
              : "Tudo sobre tecnologia você encontra aqui"}
          </h1>
        </div>

        <div className="mx-auto mt-4 flex max-w-[1100px] flex-col">
          {topics &&
            topics.map((topic) => (
              <ArticleTopic topic={topic} key={topic.id} />
            ))}
        </div>

        <Pagination page={page} search={search} totalPages={total_pages} />
      </section>
    </main>
  );
}
