import { createTheme } from "@mui/material/styles";

export const customTheme =createTheme( {
    palette: {
      type: 'light',
      primary: {
        main: '#ffffff',
        dark: '#000000',
      },
      secondary: {
        main: '#0156ff',
        light: '#F5F7FF',
      },
      background: {
        default: '#e5e5e5',
      },
      text: {
        primary: '#000000',
        secondary: '#ffffff',
        hint: '#0165B3',
        disabled: '#acacac'
        ,
      },
      error: {
        main: '#ff0000',
      },
      warning: {
        main: '#ff9800',
        
      },
      info: {
        main: '#2196f3',
      },
      success: {
        main: 'rgba(76,228,83,0.89)',
      },
    },
    typography: {
      fontFamily: 'Montserrat',
      fontSize: 14,
      h1: {
          //footer text
        fontWeight: 500,
        fontSize: '2.3rem',
        lineHeight: 1.17,
        color:"#ffffff"
      },
      h2: {
          //product header
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.1rem',
        fontWeight: 700,
      },
      h4: {
        fontSize: '1rem',
        fontWeight: 600,
      },
      h5: {//normasl
        fontSize: '0.7rem',
        fontWeight: 400,
      },
      h6: {//bold 
        fontSize: '0.7rem',
        fontWeight: 600,
      },
      subtitle1: {
        fontSize: '0.8rem',
        fontWeight: 300,
      },
      subtitle2: {
        fontWeight: 400,
        fontSize: '0.7rem',
      },
      body1: {
          //product discription
        fontSize: '0.8rem',
      },
      body2: {
          //sub menu in product field
        fontSize: '0.9rem',
        fontWeight: 600,
      },
      button: {
        fontSize: '0.9rem',
        fontWeight: 600,
      },
      overline: {
        fontWeight: 600,
        fontSize: '0.9rem',
      },
    },
    shape: {
      borderRadius: 1,
    },
  });

