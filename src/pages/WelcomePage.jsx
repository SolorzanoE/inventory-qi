import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import SettingsSuggestRounded from '@mui/icons-material/SettingsSuggestRounded';

const WelcomePage = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        alignContent: "center",
        textAlign: "center", 
        color: "disabled.main",
      }}
    >
      <SettingsSuggestRounded sx={{ fontSize: 150 }} />
      <Typography variant="h4" fontWeight={fontWeight.medium}> Ya es hora </Typography>
      <Typography variant="h4" fontWeight={fontWeight.bold}> Empecemos </Typography>
    </Box>
  )
}

export default WelcomePage