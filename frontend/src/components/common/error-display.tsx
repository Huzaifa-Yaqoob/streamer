import { cn } from "@/lib/utils";
import { Small } from "./typography";

interface ErrorProps {
  errorMessage: string;
  className?: string;
}

export default function ErrorMessage({ errorMessage, className }: ErrorProps) {
  if (errorMessage === "") {
    return <></>;
  }
  return (
    <div
      className={cn(
        "text-destructive bg-destructive-foreground py-1 px-2 rounded",
        className
      )}
    >
      <Small>{errorMessage}</Small>
    </div>
  );
}
