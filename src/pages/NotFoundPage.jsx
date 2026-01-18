import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';

const NotFoundPage = () => {
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
          alignItems: "center", 
          textAlign: "center", 
          color: "onBackground.main" 
        }}
      >
        <SentimentVeryDissatisfied 
          sx={{
            fontSize: "12rem"
          }}
        />
        <Typography variant="h1" sx={{ fontWeight: fontWeight.semibold }}> 
          404 
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: fontWeight.bold }}> 
          Not Found 
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: fontWeight.medium }}> 
          La página solicitada no fue encontrada
        </Typography>
      </Stack>
    </Container>
  )
}

export default NotFoundPage