import * as React from "react";

/** ReadOnlyField — Certa DS 4.0 (Figma set 520:1872).
 *  Display-context field. Label 12px Caption, value Body 14 text/primary.
 *  Type(12) × State(Filled/Empty) = 24 variants. */
export interface ReadOnlyFieldProps {
  /** Field label (12px Caption, non-interactive). */
  label?: string;
  /** Resolved value. Null/empty → renders `emptyText` in text/disabled. */
  value?: React.ReactNode;
  /** Optional 16px value icon (display-context exception to 20px). */
  icon?: React.ReactNode;
  /** Placeholder shown when empty. Defaults to an em-dash. */
  emptyText?: string;
  /** Boolean/Select/Multi value(s) rendered as Badge pills with a 1px
   *  border/subtle stroke. When present, takes precedence over `value`. */
  pills?: React.ReactNode[] | null;
}

export declare function ReadOnlyField(props: ReadOnlyFieldProps): JSX.Element;
export default ReadOnlyField;
