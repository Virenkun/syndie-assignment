import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <div className="mb-2">
            <Skeleton className="h-5 w-64" />
          </div>
          <Skeleton className="h-8 w-80 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
      </div>

      <Skeleton className="h-10 w-40 mb-6" />

      <div className="border rounded-lg">
        <div className="p-4">
          <Skeleton className="h-12 w-full mb-4" />
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-16 w-full mb-4" />
            ))}
        </div>
      </div>
    </div>
  );
}
