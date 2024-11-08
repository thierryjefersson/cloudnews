"use client";

import DOMPurify from "isomorphic-dompurify";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";
import { decodeHTML } from "entities";

function applyPrismHighlight(content: string, language: string = "js") {
  const regex = /<pre><code>([\s\S]*?)<\/code><\/pre>/g;

  return content.replace(regex, (match, code) => {
    // Remove qualquer codificação existente do código
    const decodedCode = decodeHTML(code);

    // Destaca o código com o Prism
    const highlightedCode = Prism.highlight(
      decodedCode,
      Prism.languages[language],
      language,
    );

    // Retorna o código com o destaque do Prism
    return `<pre class="language-${language}"><code class="language-${language}">${highlightedCode}</code></pre>`;
  });
}

export default function ArticlePost({ body }: { body: string }) {
  const highlightedBody = applyPrismHighlight(body);

  return (
    <div className="prose mx-auto w-full max-w-[900px] break-all pb-6 dark:prose-invert prose-a:text-primary">
      <div
        className="text-wrap [&_code]:rounded-md"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(highlightedBody),
        }}
      ></div>
    </div>
  );
}
