import type { Color } from "@mui/material";

export type ColorShades = Partial<Color>;

export type ColorPalette = {
  lightSlateBlue: ColorShades;
  lipstickRed: ColorShades;
  darkOrange: ColorShades;
  deepAqua: ColorShades;
  sapphireBlue: ColorShades;
  darkMint: ColorShades;
  butterflyBlue: ColorShades;
  orchid: ColorShades;
  mirage: ColorShades;
  iron: ColorShades;
  slate: ColorShades;
  red: ColorShades;
  lightBlue: ColorShades;
  black: ColorShades;
};

export const colorPalette: ColorPalette = {
  iron: {
    900: "hsla(0, 0%, 49%, 1)",
    800: "hsla(0, 0%, 67%, 1)", // disabled color
    700: "hsla(0, 0%, 85%, 1)",
    600: "hsla(0, 0%, 100%, 1)", // white
    500: "hsla(218, 15%, 59%, 1)",
    400: "hsla(0, 0%, 18%, 1)",
    300: "hsla(0, 0%, 0%, 0.35)", // shadow color
  },
  slate: {
    900: "hsla(212, 19%, 37%, 1)", // info
    800: "hsl(210, 20%, 96%)",
    700: "hsl(193, 22%, 92%)",
    600: "	hsl(0, 0%, 98%)",
    500: "hsl(0, 0%, 49%)",
  },
  mirage: {
    900: "hsla(224, 35%, 12%, 1)", // primary
    800: "hsla(230, 90%, 3%, 0.08)",
    700: "hsla(226, 34%, 15%, 1)",
    600: "hsla(0, 0%, 22%, 0.7)",
  },
  lightSlateBlue: {
    900: "hsla(234, 99%, 68%, 1)",
    800: "hsla(234, 98%, 81%, 1)",
    700: "hsla(233, 100%, 94%, 1)",
    600: "hsla(236, 100%, 97%, 1)",
  },
  lipstickRed: {
    900: "hsla(349, 90%, 41%, 1)",
    800: "hsla(350, 63%, 64%, 1)",
    700: "hsla(349, 66%, 87%, 1)",
    600: "hsla(348, 100%, 95%, 1)",
  },
  darkOrange: {
    900: "hsla(32, 100%, 52%, 1)", //warning
    800: "hsla(32, 100%, 71%, 1)",
    700: "hsla(33, 100%, 90%, 1)",
    600: "hsla(33, 100%, 95%, 1)",
  },
  deepAqua: {
    900: "hsla(183, 87%, 27%, 1)",
    800: "hsla(184, 50%, 68%, 1)",
    700: "hsla(183, 68%, 79%, 1)",
    600: "hsla(183, 85%, 95%, 1)",
  },
  sapphireBlue: {
    900: "hsla(223, 59%, 49%, 1)",
    800: "hsla(223, 56%, 69%, 1)",
    700: "hsla(222, 58%, 90%, 1)",
    600: "hsla(223, 54%, 95%, 1)",
    500: "hsl(216, 100%, 91%)",
    400: "	hsl(217, 100%, 95%)",
    300: "	hsl(193, 22%, 92%)",
  },
  darkMint: {
    900: "hsla(136, 59%, 49%, 1)",
    800: "hsla(136, 56%, 69%, 1)",
    700: "hsla(136, 58%, 90%, 1)",
    600: "hsla(133, 54%, 95%, 1)",
  },
  butterflyBlue: {
    900: "hsla(203, 79%, 57%, 1)", //secondary
    800: "hsla(204, 79%, 74%, 1)",
    700: "hsl(204, 16%, 88%)",
    600: "hsla(209, 83%, 91%, 1)",
    500: "hsla(203, 82%, 96%, 1)",
    400: "hsla(208, 25%, 66%, 1)", //primary.light
    300: "hsla(207, 17%, 88%, 1)",
  },
  orchid: {
    900: "hsla(295, 60%, 66%, 1)",
    800: "hsla(295, 61%, 80%, 1)",
    700: "hsla(297, 60%, 93%, 1)",
    600: "hsla(295, 65%, 97%, 1)",
  },
  red: {
    900: "hsla(0, 90%, 47%, 1)", //error
    800: "hsla(0, 73%, 59%, 1)",
  },
  lightBlue: {
    100: "hsla(193, 4%, 92%)",
    50: "hsla(193, 0%, 100%)",
  },
  black: {
    900: "hsl(0, 0%, 0%)",
  },
};
