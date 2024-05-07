// import original module declarations
import 'styled-components';


// and extend them!
declare module 'styled-components' {
  export interface IDashboardColors {
    graphTextColor1: string;
    graphBgColor1: string;
    graphBgColor2: string;
    graphBgColor3: string;
    graphBgColor4: string;
    graphBgColor5: string;
    graphBgColor6: string;
    graphBgColor7: string;
  }
  export interface DefaultTheme {
    pallete: {
      white: string,
      black: string,
      blue: string,
      green: string,
      powderBlue: string,
      grayVariant1: string,
      grayVariant2: string,
      grayVariant3: string,
      grayVariant4: string,
      grayVariant5: string,
      grayVariant6: string,
      grayVariant7: string,
      primaryPurple: string,
      purpleLight: string,
      grayNeutral: string,
      defaultTextColor: string,
      primaryPurpleText: string,
      genericBackgroundColor: string,
      toolbarBgColor: string,
      toolbarBgColorOnHover: string
    },
    semantics: {
      standardBorder: string;
      secondaryTextColor: string,
    }
    channelSpecific: {
      facebook: string,
      email: string,
      whatsApp: string,
      instagram: string,
      twitter: string,
      telephonic: string,
      sms: string
    }
    others: {
      scrollHandleColor: string;
      scrollContainerColor: string;
      sideMenuBg: string;
      sideMenuIconColor: string;
      sideMenuHoverColor: string;
    },
    dashboard: IDashboardColors
  }
}