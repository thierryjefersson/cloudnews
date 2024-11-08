import { Skeleton } from "./ui/skeleton";

export default function SkeletonTopic() {
  return (
    <div className="mt-4 flex flex-col gap-3">
      {[0, 1, 2, 3].map((index: number) => (
        <div key={index} className="space-y-2">
          <Skeleton className="h-[15px] w-[100px] rounded-sm"></Skeleton>
          <Skeleton className="h-[40px] w-[700px] rounded-sm"></Skeleton>
          <Skeleton className="h-[20px] w-[200px] rounded-sm"></Skeleton>
        </div>
      ))}
    </div>
  );
}
