import { createTheme } from "@mui/material/styles"

const themeDark = {
  palette: {
    primary: {
      main: "#1461B3"
    },
    onPrimary: {
      main: "#FFFFFF"
    },
    accent: {
      main: "#1C89FD"
    },
    onAccent: {
      main: "#072443"
    },
    background: {
      main: "#072443"
    },
    onBackground: {
      main: "#FFFFFF"
    }, 
    surface: {
      main: "#092E56"
    }, 
    onSurface: {
      main: "#FFFFFF"
    },
    border: {
      main: "#0C3869"
    },
    error: {
      main: "#EF5350"
    },
    onError: {
      main: "#072443"
    },
    disabled: {
      main: "#FFFFFF80"
    }
  }
}

const themeLight = {
  palette: {
    primary: {
      main: "#1461B3"
    },
    onPrimary: {
      main: "#FFFFFF"
    },
    accent: {
      main: "#1C89FD"
    },
    onAccent: {
      main: "#FFFFFF"
    },
    background: {
      main: "#FFFFFF"
    },
    onBackground: {
      main: "#072443"
    }, 
    surface: {
      main: "#FFFFFF"
    }, 
    onSurface: {
      main: "#072443"
    },
    border: {
      main: "#D6E4F5"
    },
    error: {
      main: "#D32F2F"
    },
    onError: {
      main: "#FFFFFF"
    },
    disabled: {
      main: "#07244380"
    }
  }
}

export const appStyle = createTheme({
  colorSchemes: {
    dark: themeDark,
    light: themeLight
  },
  typography: {
    fontFamily: "Poppins",
  }
})

export const fontWeight = {
  regular:	400,
  medium:	500,
  semibold:	600,
  bold:	700
}