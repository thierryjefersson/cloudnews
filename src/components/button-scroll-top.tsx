"use client";

import { ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function ButtonScrollTop() {
  const [isVisible, setIsVisible] = useState(false);
  const isBrowser = () => typeof window !== undefined;

  function scrollToTop() {
    if (!isBrowser) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleScroll = () =>
    window.scrollY > 100 ? setIsVisible(true) : setIsVisible(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      data-visible={isVisible}
      className="pointer-events-none fixed bottom-0 right-0 pb-6 pr-4 opacity-0 transition-opacity data-[visible=true]:pointer-events-auto data-[visible=true]:opacity-100"
    >
      <Button
        data-visible={isVisible}
        title="Retornar ao topo"
        size={"icon"}
        variant={"ghost"}
        className="pointer-events-none opacity-0 transition-opacity data-[visible=true]:pointer-events-auto data-[visible=true]:opacity-100"
        onClick={scrollToTop}
      >
        <ChevronUp />
        <span className="sr-only">Retornar ao topo</span>
      </Button>
    </div>
  );
}
