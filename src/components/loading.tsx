import { CloudLightning } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[100] flex size-full items-center justify-center bg-black/80">
      <CloudLightning size={34} className="animate-pulse text-primary" />
    </div>
  );
}
