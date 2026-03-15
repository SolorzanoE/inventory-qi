import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import SettingsSuggestRounded from '@mui/icons-material/SettingsSuggestRounded';

const WelcomePage = () => {
  return (
    <Box
      sx={{
        flex: 1,
        alignContent: "center",
        textAlign: "center", 
        color: "disabled.main",
      }}
    >
      <SettingsSuggestRounded sx={{ fontSize: 180 }} />
      <Typography variant="h4" fontWeight={fontWeight.medium}> 
        Consulta tu inventario al instante 
      </Typography>
      <Typography variant="h5" fontWeight={fontWeight.bold}> 
        Accede a la información que necesitas, cuando la necesitas. 
      </Typography>
    </Box>
  )
}

export default WelcomePage