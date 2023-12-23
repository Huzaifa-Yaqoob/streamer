import { Nova_Square } from "next/font/google";
import { cn } from "@/lib/utils";

export const fontStyle = Nova_Square({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--nova",
});

interface TypographyProps {
  children: React.ReactNode;
  className?: string | undefined;
}

export function H1({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <h1
      className={cn(
        "scroll-m-24 text-6xl font-extrabold tracking-tight lg:text-7xl font-style",
        fontStyle.variable,
        className
      )}
    >
      {children}
    </h1>
  );
}

export function H2({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-4xl font-semibold tracking-tight first:mt-0",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function H3({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-3xl font-semibold tracking-tight",
        className
      )}
    >
      {children}
    </h3>
  );
}

export function H4({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight font-style",
        fontStyle.variable,
        className
      )}
    >
      {children}
    </h4>
  );
}

export function H6({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return <h6 className={cn("text-lg font-semibold", className)}>{children}</h6>;
}

export function P({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
}

export function Blockquote({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <blockquote className={cn("mt-6 border-l-2 pl-6 italic", className)}>
      {children}
    </blockquote>
  );
}

export function Strong({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
    >
      {children}
    </code>
  );
}

export function Lead({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
  );
}

export function Small({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
}

export function Muted({
  children,
  className,
}: TypographyProps): React.ReactElement {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
}
