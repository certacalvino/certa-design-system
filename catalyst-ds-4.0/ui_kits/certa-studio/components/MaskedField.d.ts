import * as React from "react";

export type MaskedFieldSize = "m" | "s";
export type MaskedFieldState = "default" | "filled" | "focus" | "error" | "disabled";

/** MaskedField — Certa DS 4.0 (Figma set 453:800).
 *  Masked value with a reveal toggle. State × Size = 12 variants. */
export interface MaskedFieldProps {
  /** The sensitive value (rendered as mask chars until revealed). */
  value?: string;
  /** M 40 / S 32. */
  size?: MaskedFieldSize;
  /** Visual state. */
  state?: MaskedFieldState;
  /** Character used for masking (default "•"). */
  maskChar?: string;
  /** Initial / controlled reveal state. */
  defaultRevealed?: boolean;
  /** When provided, the component is controlled — receives the next reveal value. */
  onToggleReveal?: (revealed: boolean) => void;
}

export declare function MaskedField(props: MaskedFieldProps): JSX.Element;
export default MaskedField;
