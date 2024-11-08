"use server";

import { Post } from "@/schemas/post";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

const sanitizeOptions = {
  ALLOWED_TAGS: [
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "strong",
    "em",
    "u",
    "strike",
    "code",
    "ul",
    "ol",
    "li",
    "a",
    "table",
    "tr",
    "th",
    "td",
    "thead",
    "tbody",
    "tfoot",
    "pre",
    "blockquote",
    "hr",
    "br",
    "del",
  ],
  ALLOWED_ATTR: ["href", "target", "rel"],
  FORBID_TAGS: ["style", "script", "iframe", "img"],
  FORBID_ATTR: ["style"],
};

export default async function getPost(author: string, post_slug: string) {
  marked.setOptions({ gfm: true, breaks: true, async: false });

  try {
    if (!author || !post_slug) throw new Error("Postagem não encontrada");
    const response = await fetch(
      `${process.env.URL_API}/posts/${author}/${post_slug}`,
      {
        next: {
          tags: ["post"],
          revalidate: 60,
        },
      },
    );
    if (!response.ok) throw new Error("Postagem não encontrada");

    const post = (await response.json()) as Post;
    const postBodyHtml = await marked.parse(post.body);
    const postBodySanitized = DOMPurify.sanitize(postBodyHtml, sanitizeOptions);

    return {
      ...post,
      body: postBodySanitized,
    };
  } catch (error) {
    console.log(error);
  }
}
