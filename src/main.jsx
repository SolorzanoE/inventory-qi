import { CssBaseline, ThemeProvider } from '@mui/material'
import { createRoot } from 'react-dom/client'
import { appStyle } from '@root/app-style'
import AppRoute from '@src/routes/app.route'

createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={appStyle} defaultMode='system'>
    <CssBaseline />
    <AppRoute />
  </ThemeProvider>
)
