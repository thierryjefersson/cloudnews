import ResetPasswordForm from "@/components/form/reset-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alterar senha | CloudNews",
  description: "Altere sua senha",
};

export default async function TokenPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const token = (await params).token;
  return (
    <div className="mx-auto flex max-w-[450px] flex-col justify-center px-5 md:pt-64">
      <h2 className="text-center text-xl font-bold text-foreground md:mb-1 md:text-2xl lg:text-3xl">
        Defina uma nova senha
      </h2>
      <ResetPasswordForm token={token} />
    </div>
  );
}
