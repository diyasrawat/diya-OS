import React from "react";

/**
 * Drop-in replacement for <button>.
 * suppressHydrationWarning silences attribute mismatches injected by
 * browser extensions (Grammarly fdprocessedid, LastPass, etc.).
 */
type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SafeButton({ children, ...props }: Props) {
  return (
    <button suppressHydrationWarning {...props}>
      {children}
    </button>
  );
}
