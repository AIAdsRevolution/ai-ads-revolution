import { clsx } from "@/lib/home-v2/format";

export default function UiCard({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={clsx("glass rounded-2xl shadow-soft", className)}>{children}</div>;
}
