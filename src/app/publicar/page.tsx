import PublicarForm from "@/components/form/publicar-form";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Publicar | CloudNews",
  description:
    "Publique seu conteúdo na melhor plataforma de notícias na área da tecnologia",
};

export default function PublicarPage() {
  return (
    <main>
      <PublicarForm />
    </main>
  );
}
