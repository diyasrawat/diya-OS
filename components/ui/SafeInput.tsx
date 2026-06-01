import React from "react";

/**
 * Drop-in replacement for <input>.
 * suppressHydrationWarning silences attribute mismatches injected by
 * browser extensions (Grammarly fdprocessedid, LastPass, etc.) without
 * affecting any runtime behaviour.
 */
type Props = React.InputHTMLAttributes<HTMLInputElement>;

export default function SafeInput(props: Props) {
  return <input suppressHydrationWarning {...props} />;
}
