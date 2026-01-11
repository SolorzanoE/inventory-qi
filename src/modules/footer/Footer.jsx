import AppBar from "@mui/material/AppBar"
import Stack from "@mui/material/Stack"
import { fontWeight } from "@root/app-style"
import Typography from "@mui/material/Typography"

function Footer() {
  return (
    <AppBar position="fixed"
      enableColorOnDark
      elevation={2}
      sx={(theme) => ({
        top: "auto",
        bottom: 0,
        boxShadow: `0px 8px 24px ${theme.palette.border.main}`
      })}
    >
      <Stack direction="row"
        sx={{
          justifyContent: "center",
          bgcolor: "surface.main"
        }}
      >
        <Typography 
          variant="body2"
          color="onSurface"
          sx={{ fontWeight: fontWeight.medium, paddingY: 0.5 }}
        > 
          {`© Copyright ${new Date().getFullYear()}`}  
        </Typography>
      </Stack>
    </AppBar>
  )
}

export default Footer