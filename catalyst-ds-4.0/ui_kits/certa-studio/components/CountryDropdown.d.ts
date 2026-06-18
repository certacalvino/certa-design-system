import * as React from "react";

export interface Country {
  code: string;
  name: string;
  dial: string;
  flag: string;
}

export declare const SAMPLE_COUNTRIES: Country[];

/** CountryDropdown — Certa DS 4.0 (row set 440:450 + panel 441:437).
 *  280w r8 overlay with search + flag/name/dial rows. */
export interface CountryDropdownProps {
  /** Country list (defaults to SAMPLE_COUNTRIES — 6 sample countries). */
  countries?: Country[];
  /** Selected country code. */
  value?: string | null;
  /** Fired with the selected code. */
  onSelect?: (code: string) => void;
  /** Show the search input (default true). */
  searchable?: boolean;
}

export declare function CountryDropdown(props: CountryDropdownProps): JSX.Element;
export default CountryDropdown;
