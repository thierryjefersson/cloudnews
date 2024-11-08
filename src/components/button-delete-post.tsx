"use client";

import { useUser } from "@/context/user-context";
import { Button } from "./ui/button";
import { useState, useTransition } from "react";
import deletePost from "@/actions/delete-post";
import ErrorMessageInput from "./form/error.message-input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function ButtonDeletePost({
  author,
  slug,
}: {
  author: string;
  slug: string;
}) {
  const { name } = useUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const { toast } = useToast();
  const route = useRouter();

  function handleDelete() {
    const isConfirmed = confirm("Tem certeza que deseja deletar sua postagem?");
    if (!isConfirmed) return;
    startTransition(async () => {
      const response = await deletePost({ author, post_slug: slug });
      if (response && response.message) setError(response.message);

      toast({
        variant: "destructive",
        title: "Postagem deletada!",
      });

      route.push("/");
    });
  }

  if (name !== author) return;
  return (
    <>
      <Button
        disabled={isPending}
        onClick={handleDelete}
        title="Deletar postagem"
        size={"sm"}
        variant={"destructive"}
      >
        {isPending ? "Deletando..." : "Deletar"}
      </Button>
      {error && <ErrorMessageInput text={error} />}
    </>
  );
}
