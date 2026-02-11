import LightMode from "@mui/icons-material/LightMode"
import DarkMode from "@mui/icons-material/DarkMode"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { useColorScheme } from "@mui/material/styles"
import { fontWeight } from "@root/appStyle"
import { useNavigate } from "react-router"

// actionButtons = [{ icon, onClick,  }]
const Header = ({ actionButtons = [], redirect }) => {
  const navigate = useNavigate()

  const { systemMode, mode, setMode } = useColorScheme()

  const globalMode = (mode === "system") ? systemMode : mode

  const toggleMode = () => {
    setMode(globalMode === "dark" ? "light" : "dark")
  }

  const handleClickTitle = () => navigate(`${redirect}`)

  return (
    <AppBar position="sticky"
      color="primary"
      enableColorOnDark
    >
      <Toolbar>
        <Typography variant="h5" component="div"
          onClick={handleClickTitle}
          color="onPrimary"
          sx={{
            fontWeight: fontWeight.semibold,
            cursor: redirect ? "pointer" : "text"
          }}
        >
          Inventory-Qi
        </Typography>
        <Stack
          direction="row"
          sx={{ flex: 1, justifyContent: "end" }}
          spacing={{ xs: 0, md: 2 }}
        >
          <IconButton color="onPrimary" onClick={toggleMode}>
            { globalMode === "dark" ? <LightMode /> : <DarkMode /> }
          </IconButton>
          { actionButtons.map((element, index) => (
            <IconButton key={index} onClick={element.onClick} color="onPrimary">
              { element.icon }
            </IconButton>
          )) }
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header