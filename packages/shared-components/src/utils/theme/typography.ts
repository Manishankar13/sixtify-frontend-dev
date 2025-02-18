import type { TypographyPropsVariantOverrides } from "@mui/material";
import type {
  FontStyleOptions,
  TypographyOptions,
  TypographyStyleOptions,
  Variant,
} from "@mui/material/styles/createTypography";

type TypographyVariant = keyof TypographyPropsVariantOverrides;
type TypographyActiveVariants = {
  [K in TypographyVariant]: TypographyPropsVariantOverrides[K] extends true
    ? K
    : never;
}[TypographyVariant];

export const typographyFontStyleOptions: FontStyleOptions = {
  fontSize: 14,
  fontFamily: "Poppins",
};

export const typographyOptions: Partial<
  Record<Variant, TypographyStyleOptions>
> = {
  h1: { fontSize: "96px", lineHeight: "112px" },
  h2: { fontSize: "60px", lineHeight: "72px" },
  h3: { fontSize: "48px", lineHeight: "56px" },
  h4: { fontSize: "36px", lineHeight: "42px" },
  h5: { fontSize: "24px", lineHeight: "24px" },
  h6: { fontSize: "20px", lineHeight: "24px" },
  subtitle1: { fontSize: "18px", lineHeight: "24px" },
  subtitle2: { fontSize: "14px", lineHeight: "24px" },
  body1: { fontSize: "16px", lineHeight: "24px" },
  body2: { fontSize: "14px", lineHeight: "20px" },
  caption: { fontSize: "12px", lineHeight: "16px" },
};

export const typographyVariantMapping: Record<
  TypographyActiveVariants,
  string
> = {
  subHeader1: "p",
  subHeader2: "p",
  body: "p",
  subText: "p",
  smallText: "p",
  tinyText: "p",
};

export const typographyThemeOptions: TypographyOptions = {
  ...typographyFontStyleOptions,
  ...typographyOptions,
};
