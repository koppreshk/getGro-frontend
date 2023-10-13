// import original module declarations
import 'styled-components';


// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    pallete: {
      white: string,
      black: string,
      blue: string,
      powderBlue: string,
      grayVariant1: string,
      grayVariant2: string,
      grayVariant3: string,
      grayVariant4: string,
      grayVariant5: string,
      grayVariant6: string,
    },
    others: {
      scrollHandleColor: string;
      scrollContainerColor: string
    }
  }
}