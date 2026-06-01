import React from "react";

/**
 * Drop-in replacement for <textarea>.
 * suppressHydrationWarning silences attribute mismatches injected by
 * browser extensions (Grammarly fdprocessedid, LastPass, etc.).
 */
type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function SafeTextarea(props: Props) {
  return <textarea suppressHydrationWarning {...props} />;
}
