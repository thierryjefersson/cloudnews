"use server";

import { TopicResponse } from "@/schemas/topics";

export default async function getPosts(
  page: number = 1,
  author?: string,
  search: string = "",
) {
  try {
    const url = `http://localhost:3333/api/posts/?author=${author}&page=${page}&search=${search}`;
    const response = await fetch(url, {
      next: {
        tags: ["posts"],
        revalidate: 60,
      },
    });
    if (response.status === 404) throw new Error("Usuário não encontrado");
    const result = (await response.json()) as TopicResponse;
    return result;
  } catch (error) {
    console.log(error);
  }
}
