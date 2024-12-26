import RecuperarForm from "@/components/form/recuperar-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recuperar senha | CloudNews",
  description: "Recupere sua senha",
};

export default function RecuperarPage() {
  return (
    <div className="mx-auto flex max-w-[450px] flex-col justify-center px-5 md:pt-64">
      <h2 className="text-center text-xl font-bold text-foreground md:mb-1 md:text-2xl lg:text-3xl">
        Recuperação de senha
      </h2>
      <RecuperarForm />
    </div>
  );
}
