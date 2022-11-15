// import { Theme, vars } from '../css/sprinkles.css'

// export const lightTheme: Theme = {
//   colors: {
//     error: '#FF494A',
//     textDisconnect: '#FF494A',
//     modalBackdrop: 'rgba(0, 0, 0, 0.3)',
//     backgroundSecondary: '#FCFCFD',
//     modalClose: 'rgba(60, 66, 82, 0.06)',
//     text: '#25292E',
//     modalTextSecondary: 'rgba(60, 66, 82, 0.6)',

//     // Bryan's colors from Figma that vary dark vs light
//     blackBlue: vars.color.grey900,
//     blackBlue20: `#0E111A33`,
//     darkGray: vars.color.grey500,
//     medGray: `#5E68873D`,
//     lightGray: vars.color.grey50,
//     white: '#FFFFFF',
//     darkGray10: `#5E68871A`,
//     explicitWhite: '#FFFFFF',
//     magicGradient: vars.color.pink400,
//     placeholder: vars.color.grey300,
//     lightGrayButton: vars.color.grey100,
//     lightGrayContainer: vars.color.grey100,
//     lightGrayOverlay: '#E6E8F0',

//     // Opacities of black and white
//     white95: '#EDEFF7F2',
//     white90: '#FFFFFFE5',
//     white80: '#FFFFFFCC',
//     white08: '#29324908',
//   },
//   shadows: {
//     menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
//     genieBlue: '0 4px 16px 0 rgba(251, 17, 142)',
//     elevation: '0px 4px 16px rgba(70, 115, 250, 0.4)',
//     tooltip: '0px 4px 16px rgba(10, 10, 59, 0.2)',
//   },
// }

import { Theme, vars } from '../css/sprinkles.css'

export const darkTheme: Theme = {
  colors: {
    error: '#FF494A',
    textDisconnect: '#FF494A',
    modalBackdrop: 'linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))',
    backgroundSecondary: '#23262F',
    modalClose: 'rgba(255, 255, 255, 0.08)',
    text: '#fff',
    modalTextSecondary: 'rgba(255, 255, 255, 0.6)',

    // Bryan's colors from Figma that vary dark vs light
    blackBlue: '#FFFFFF',
    blackBlue20: '#FFFFFF20',
    darkGray: vars.color.grey300,
    medGray: `#99A1BD3D`,
    lightGray: vars.color.grey900,
    white: '#000000',
    darkGray10: `#99A1BD1A`,
    explicitWhite: '#FFFFFF',
    magicGradient: vars.color.blue400,
    placeholder: vars.color.grey400,
    lightGrayButton: vars.color.grey700,
    lightGrayContainer: `#99A1BD14`,
    lightGrayOverlay: '#35373F',

    // Opacities of black and white
    white95: '#0E111AF2',
    white90: '#000000E5',
    white80: '#000000CC',
    white08: '#0000000C',
  },
  shadows: {
    menu: '0px 10px 30px rgba(0, 0, 0, 0.1)',
    genieBlue: '0 4px 16px 0 rgba(70, 115, 250, 0.4)',
    elevation: '0px 4px 16px rgba(70, 115, 250, 0.4)',
    tooltip: '0px 4px 16px rgba(255, 255, 255, 0.2)',
  },
}
