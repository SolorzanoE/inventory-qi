import { createRoot } from 'react-dom/client'
import { appStyle } from '@root/appStyle'
import Router from '@src/routes/Router'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import SnackbarProvider from '@src/providers/SnackbarProvider'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={appStyle} defaultMode='system'>
    <CssBaseline />
    <SnackbarProvider>
      <Router />
    </SnackbarProvider>
  </ThemeProvider>
)