import { MouseEventHandler } from "react";
import { FaBandcamp } from "react-icons/fa";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ButtonProps {
  text: string;
  isLoading: boolean;
  className?: string;
  type?: "button" | "reset" | "submit" | undefined;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}

export default function LoadingButton({
  text,
  isLoading,
  className,
  type = "submit",
  variant = "default",
  onClick,
}: ButtonProps): React.ReactElement {
  return (
    <Button
      type={type}
      variant={variant}
      className={cn("active:scale-95", className)}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <FaBandcamp className="mr-2 h-4 w-4 animate-spin" /> Loading
        </>
      ) : (
        text
      )}
    </Button>
  );
}
