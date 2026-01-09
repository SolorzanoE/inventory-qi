import { AppBar, IconButton, Stack, Toolbar, Typography, useColorScheme } from "@mui/material"
import { fontWeight } from "@root/app-style"
import { LightMode, DarkMode, Logout } from "@mui/icons-material"

function Header({ showLogOut }) {
  const { systemMode, mode, setMode } = useColorScheme()

  const globalMode = (mode === "system")? systemMode : mode

  const toggleMode = () => {
    setMode(globalMode === "dark" ? "light" : "dark")
  }

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h5"
          color="onPrimary"
          sx={{
            fontWeight: fontWeight.semibold,
            flexGrow: 1
          }}
        >
          Inventory-Qi
        </Typography>
        <Stack
          direction="row"
          spacing={2}
        >
          <IconButton color="onPrimary" onClick={toggleMode}>
            { globalMode === "dark" ? <LightMode /> : <DarkMode /> }
          </IconButton>
          <IconButton color="onPrimary"
            sx={{
              display: showLogOut ? "" : "none"
            }}
          >
            <Logout />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header