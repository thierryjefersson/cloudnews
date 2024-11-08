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
    <div className="fixed bottom-0 right-0 pb-4 pr-4">
      {isVisible && (
        <Button
          title="Retornar ao topo"
          size={"icon"}
          variant={"ghost"}
          onClick={scrollToTop}
        >
          <ChevronUp />
        </Button>
      )}
    </div>
  );
}
