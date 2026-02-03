import { Spinner } from "@/components/ui/spinner";

export function LoadingSearchResult() {
  return (
    <div className="flex items-center gap-6">
      <Spinner className="size-8" />
    </div>
  );
}
