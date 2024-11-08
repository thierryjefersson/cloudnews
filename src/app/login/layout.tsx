import Image from "next/image";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-screen grid-cols-1 grid-rows-[auto_1fr] gap-5 bg-background md:grid-cols-2 md:grid-rows-1 md:justify-between md:gap-0 lg:grid-cols-[1.5fr_1fr]">
      <div className="relative h-60 w-full sm:h-72 md:block md:size-full">
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
      <section className="mt-4 w-full md:mt-0 md:pt-60">{children}</section>
    </main>
  );
}
