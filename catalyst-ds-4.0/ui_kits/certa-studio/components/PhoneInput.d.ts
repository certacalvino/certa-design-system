import * as React from "react";
import { Country } from "./CountryDropdown";

export type PhoneInputSize = "m" | "s";

/** PhoneInput — Certa DS 4.0 (Forms & Inputs).
 *  Country selector (flag + dial + chevron) joined to a number field.
 *  Opens CountryDropdown. Sizes M 40 / S 32. */
export interface PhoneInputProps {
  size?: PhoneInputSize;
  /** Available countries (defaults to SAMPLE_COUNTRIES). */
  countries?: Country[];
  /** Selected country code. */
  countryCode?: string;
  /** Phone number string. */
  value?: string;
  onChange?: (value: string) => void;
  onCountryChange?: (code: string) => void;
  disabled?: boolean;
  error?: boolean;
}

export declare function PhoneInput(props: PhoneInputProps): JSX.Element;
export default PhoneInput;
