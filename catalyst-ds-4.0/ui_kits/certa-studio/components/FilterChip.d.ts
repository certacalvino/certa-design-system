import * as React from "react";

/** FilterChip — Certa DS 4.0 (Figma set 430:487).
 *  Pill 32px, r-full, light/brand model. State × Icon × Badge = 16 variants. */
export interface FilterChipProps {
  /** Selected state: bg/brand-subtle + text/link + border/focused. */
  selected?: boolean;
  /** Disabled at 40% opacity, not clickable. */
  disabled?: boolean;
  /** Optional 16px leading icon. */
  icon?: React.ReactNode;
  /** Optional trailing count badge. */
  count?: number | null;
  onClick?: () => void;
  children?: React.ReactNode;
}

export declare function FilterChip(props: FilterChipProps): JSX.Element;
export default FilterChip;
