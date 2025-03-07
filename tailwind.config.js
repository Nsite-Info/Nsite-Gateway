/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

let Primary = "#000000"
let Secondary = "#000000"
let Tertiary = "#FFF"

let PrimaryDark = "#000000"
let SecondaryDark = "#000000"
let TertiaryDark = "#FFF"

let HighlightPrimary = "#FFF"
let HighlightSecondary = "#FFF"

let HighdarkPrimary = "#FFF"
let HighdarkSecondary = "#FFF"

module.exports = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // IMPORTANT NOTICE: SETTING CUSTOM COLORS REQUIRES YOU TO REBUILD THE APP !
        // Hex: colorname: '#hexcolor',
        // Alias: colorname: colors.yellow,

        // BACKGROUND COLORS
        // Light
        colorBgLight: Primary,
        colorHeaderBgLight: Primary,
        colorFooterBgLight: Primary,
        // Dark
        colorBgDark: PrimaryDark,
        colorHeaderBgDark: PrimaryDark,
        colorFooterBgDark: PrimaryDark,

        // MENU POPUPS
        // Light
        colorHeaderBgMenuPopupLight: Secondary,
        colorHeaderBgMenuPopupTextLight: Tertiary,
        colorHeaderBgMenuPopupLinkLight: Primary,
        colorHeaderBgMenuPopupLinkHoverLight: "#dbdbdb",
        colorHeaderBgMenuPopupFooterLight: "#d2d5db",
        // Dark
        colorHeaderBgMenuPopupDark: SecondaryDark,
        colorHeaderBgMenuPopupTextDark: TertiaryDark,
        colorHeaderBgMenuPopupLinkDark: PrimaryDark,
        colorHeaderBgMenuPopupLinkHoverDark: "#334155",
        colorHeaderBgMenuPopupFooterDark: "#64748B",

        // TEXT COLORS
        // Light
        colorTxtLight: Tertiary,
        colorHeaderTxtLight: Tertiary,
        colorFooterTxtLight: Tertiary,
        // Dark
        colorTxtDark: TertiaryDark,
        colorHeaderTxtDark: TertiaryDark,
        colorFooterTxtDark: TertiaryDark,
 
        // SWITCH
        // Light
        colorSwitchBgLight: Primary,
        colorSwitchLinkLight: Secondary,
        colorSwitchLinkHoverLight: Secondary,
        // Dark
        colorSwitchBgDark: PrimaryDark,
        colorSwitchLinkDark: Secondary,
        colorSwitchLinkHoverDark: Secondary,
        
        // BUTTON COLORS
        colorBtnLight: HighlightPrimary,
        colorBtnHoverLight: HighlightSecondary,
        colorBtnDark: HighdarkPrimary,
        colorBtnHoverDark: HighdarkSecondary,

        // HIGHTLIGHT COLORS
        // Light
        colorHighLight: HighlightPrimary,
        colorHoverHighLight: HighlightSecondary,
        // Dark
        colorHighDark: HighdarkPrimary,
        colorHoverHighDark: HighdarkSecondary,

      },
      
    },
  },
  plugins: [
  //   require('@tailwindcss/line-clamp'),
  // require('@tailwindcss/typography'),
  // require('@tailwindcss/forms'),
  ],
}
