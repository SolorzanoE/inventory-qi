import { AppBar, Stack, Typography, useTheme } from "@mui/material"
import { fontWeight } from "@root/app-style"

function Footer() {
  const { palette } = useTheme()

  return (
    <AppBar position="fixed"
      enableColorOnDark
      elevation={2}
      sx={{
        top: "auto",
        bottom: 0,
        boxShadow: `0px 8px 24px ${palette.border.main}`
      }}
    >
      <Stack direction="row"
        sx={{
          justifyContent: "center",
          bgcolor: `${palette.surface.main}`
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