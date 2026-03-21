import { LoaderIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LoaderIcon
      role="status"
      aria-label="Loading"
      className={cn("size-6 animate-spin", className)}
      {...props}
    />
  );
}

export function SpinnerCustom() {
  // <div className="flex items-center gap-4">
  return (
    <div className="fixed inset-0 flex items-center justify-center z-10">
      <Spinner />
    </div>
  );
}
