"use client";

import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.min.css";
import "prismjs/components/prism-typescript";

export default function PrismHigh({ body }: { body: string }) {
  const highlightedCode = Prism.highlight(
    body,
    Prism.languages.typescript,
    "typescript",
  );

  return (
    <div className="mx-auto max-w-[900px] pb-6 dark:prose-invert prose-a:text-primary">
      <div
        className="[&_pre]:language-typscript [&_code]:language-typscript"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      ></div>
      <pre suppressHydrationWarning className="language-typescript">
        <code
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
    </div>
  );
}
