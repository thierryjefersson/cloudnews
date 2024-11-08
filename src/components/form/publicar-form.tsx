"use client";

import React, { useTransition } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import MDEditor, { ICommand } from "@uiw/react-md-editor";
import { useTheme } from "next-themes";
import rehypeSanitize from "rehype-sanitize";
import { Button } from "../ui/button";
import { CreatePostSchema, createPostSchema } from "@/schemas/publicar";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessageInput from "./error.message-input";
import createPost from "@/actions/create-post";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const blockedCommands = ["image", "checked-list", "comment"];

const filterCommands = (command: ICommand) => {
  if (command.name && blockedCommands.includes(command.name)) return false;
  else return command;
};

export default function PublicarForm() {
  const { theme } = useTheme();
  const [isPending, startTransition] = useTransition();
  const [errorTitle, setErrorTitle] = React.useState("");
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
  });

  async function handleCreatePost(formData: CreatePostSchema) {
    setErrorTitle("");
    startTransition(async () => {
      const response = (await createPost(formData)) as { message?: string };
      if (response && response.message) return setErrorTitle(response.message);
      toast({
        description: "Conteúdo publicado com sucesso!",
      });

      router.push("/");
    });
  }

  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      className="mx-auto mt-6 max-w-[1100px] px-4"
    >
      <div className="mx-auto my-4 grid w-full max-w-[1100px] grid-cols-[auto_1fr] items-center gap-4">
        <div className="h-[25px] w-1 bg-primary sm:h-[25px] md:h-[30px]"></div>
        <h1 className="text-2xl font-semibold md:text-3xl">
          Publicar novo conteúdo
        </h1>
      </div>
      <div>
        <Label htmlFor="title">Título</Label>
        <Input
          id="title"
          type="text"
          autoComplete="off"
          placeholder="e.g. Dicas de como se tornar um desenvolvedor"
          {...register("title")}
        />
        {errors.title?.message && (
          <ErrorMessageInput text={errors.title?.message} />
        )}
        {errorTitle && <ErrorMessageInput text={errorTitle} />}
      </div>
      <div
        className="mt-4 space-y-1"
        data-color-mode={theme}
        suppressHydrationWarning
      >
        <Label>Corpo da publicação</Label>
        <Controller
          name="body"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <MDEditor
              highlightEnable={false}
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              height={500}
              preview="edit"
              autoFocus
              commandsFilter={filterCommands}
              id="richTextBody"
              className="border border-transparent focus-within:border-primary [&_.w-md-editor-text]:h-full"
              previewOptions={{
                rehypePlugins: [[rehypeSanitize]],
                disallowedElements: ["style", "script", "iframe", "img"],
              }}
            />
          )}
        />
        {errors.body?.message && (
          <ErrorMessageInput text={errors.body?.message} />
        )}
      </div>
      <div className="mt-5 flex justify-end">
        <Button disabled={isPending} className="px-6">
          {isPending ? "Carregando..." : "Publicar"}
        </Button>
      </div>
    </form>
  );
}
