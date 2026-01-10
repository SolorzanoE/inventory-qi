import { createRoot } from 'react-dom/client'
import { appStyle } from '@root/app-style'
import AppRoute from '@src/routes/app.route'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={appStyle} defaultMode='system'>
    <CssBaseline />
    <AppRoute />
  </ThemeProvider>
)