"use client";

import { X } from "lucide-react";
import Link from "next/link";

export default function SearchReset() {
  const reset = () => {
    const form = document.getElementById("search-form") as HTMLFormElement;
    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <Link
        href="/"
        className="absolute right-3 top-1.5 block p-1 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
      >
        <X size={16} />
      </Link>
    </button>
  );
}
