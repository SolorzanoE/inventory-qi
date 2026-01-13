import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/app-style"
import Security from '@mui/icons-material/Security';

function NotAuthorizedPage() {
  return (
    <Container maxWidth="xl"
      sx={{
        display: "flex",
        height: "100dvh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.main"
      }}
    >
      <Stack
        sx={{
          color: "onBackground.main",
          textAlign: "center",
          alignItems: "center"
        }}
      >
        <Security 
          sx={{
            fontSize: "12rem"
          }}
        />
        <Typography variant="h1" sx={{ fontWeight: fontWeight.semibold }}> 
          403 
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: fontWeight.bold }}> 
          Not Authorized 
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: fontWeight.medium }}> 
          Lo sentimos, no tienes permisos para acceder a esta página
        </Typography>
      </Stack>
    </Container>
  )
}

export default NotAuthorizedPage