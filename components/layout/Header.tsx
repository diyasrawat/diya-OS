"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#system", label: "Personal" },
];

interface HeaderProps {
  variant?: "default" | "recruiter";
}

export default function Header({ variant = "default" }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-between items-center px-6 md:px-gutter py-4 bg-[#131315]/30 backdrop-blur-xl border-b border-white/10 h-14">
      <Link
        href="/"
        className="font-headline-lg text-[22px] font-bold text-on-surface tracking-tighter leading-none"
      >
        Diya.OS
      </Link>

      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map(({ href, label }) => {
          const isActive =
            href === "/#projects" && pathname === "/";
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "font-label-md text-label-md transition-colors duration-300",
                isActive
                  ? "text-primary font-bold border-b-2 border-primary pb-1"
                  : "text-on-surface-variant hover:text-primary"
              )}
            >
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-4">
        {variant === "recruiter" ? (
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "border-primary/30 text-primary hover:bg-primary/10"
            )}
          >
            ← Home
          </Link>
        ) : (
          <>
            <span className="material-symbols-outlined text-on-surface-variant hidden md:block">
              battery_charging_full
            </span>
            <span className="material-symbols-outlined text-on-surface-variant hidden md:block">
              settings
            </span>
          </>
        )}
      </div>
    </header>
  );
}
