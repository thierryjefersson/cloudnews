import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="bg-background md:grid md:h-screen md:grid-cols-2 md:grid-rows-1 md:justify-between lg:grid-cols-[1.5fr_1fr]">
        <div className="relative hidden md:block md:size-full">
          <Image
            src="/login.jpg"
            alt="Imagem da área de login"
            className="object-cover"
            priority
            quality={90}
            sizes="80vw"
            fill
          />
        </div>
        <section className="mt-12 w-full md:mt-0">{children}</section>
      </main>
      <Toaster />
    </>
  );
}
