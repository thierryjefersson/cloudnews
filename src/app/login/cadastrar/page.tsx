import CadastrarForm from "@/components/form/cadastrar-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cadastre-se | CloudNews",
  description: "Efetue o seu login ou cadastro no CloudNews",
};

export default function CadastrarPage() {
  return (
    <div className="mx-auto flex max-w-[450px] flex-col justify-center px-5 md:pt-36">
      <div className="flex items-center gap-5">
        <div className="h-0.5 w-full bg-gradient-to-l from-primary to-background"></div>
        <h2 className="whitespace-nowrap text-center text-2xl font-bold text-foreground md:mb-1 md:text-3xl">
          Cadastre-se
        </h2>
        <div className="h-0.5 w-full bg-gradient-to-r from-primary to-background"></div>
      </div>
      <p className="text-center font-medium">
        Insira seus dados para efetuar o cadastro
      </p>
      <CadastrarForm />
      <p className="mt-5 text-center text-sm">
        Tem uma conta?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Conecte-se
        </Link>
      </p>
    </div>
  );
}
