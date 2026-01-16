import { createRoot } from 'react-dom/client'
import { appStyle } from '@root/app-style'
import Router from '@src/routes/Router'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={appStyle} defaultMode='system'>
    <CssBaseline />
    <Router />
  </ThemeProvider>
)