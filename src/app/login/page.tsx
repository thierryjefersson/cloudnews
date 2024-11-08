import LoginForm from "@/components/form/login-form";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Entrar | CloudNews",
  description: "Efetue o seu login ou cadastro no CloudNews",
};

export default function LoginPage() {
  return (
    <div className="mx-auto flex max-w-[450px] flex-col justify-center px-5">
      <div className="flex items-center gap-5">
        <div className="h-0.5 w-full bg-gradient-to-l from-primary to-background"></div>
        <h2 className="text-center text-2xl font-bold text-foreground md:mb-1 md:text-3xl">
          Login
        </h2>
        <div className="h-0.5 w-full bg-gradient-to-r from-primary to-background"></div>
      </div>
      <p className="text-center font-medium text-foreground">
        Insira seus dados para efetuar o login
      </p>
      <LoginForm />
      <p className="mt-5 text-center text-sm">
        Não tem uma conta?{" "}
        <Link href="login/cadastrar" className="text-primary hover:underline">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
