import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { UserContextProvider } from "@/context/user-context";
import getUser from "@/actions/get-user";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import ButtonScrollTop from "@/components/button-scroll-top";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "900"],
  style: "normal",
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Página inicial | CloudNews",
  description:
    "Tudo sobre tecnologia você encontra na CloudNews, postagens e interações com a comunidade",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const name = await getUser();

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <UserContextProvider name={{ name: name }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
          <Toaster />
          <ButtonScrollTop />
        </UserContextProvider>
      </body>
    </html>
  );
}
