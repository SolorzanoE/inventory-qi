import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"

const GridCardLayout = ({ children }) => (
  <Grid container
    spacing={{ xs: 1, sm: 2, md: 3 }}
    rowSpacing={{ xs: 3, sm: 2, md: 5 }}
    columns={{ xs: 2, sm: 3, md: 4, xl: 6 }}
    sx={{ flex: 1, overflow: "auto", pb: 3, pt: 1 }}
  >
    {children}
  </Grid>
)

const GridCardElement = ({ children }) => (
  <Grid size={1}
    sx={{ px: { xs: 1, sm: 1, md: 4 } }}
  >
    {children}
  </Grid>
)

const GridMessage = ({ message, icon }) => (
  <Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    { icon }
    <Typography variant="h6" 
      sx={{ color: "disabled.main", fontWeight: fontWeight.semibold, textAlign: "center" }}
    > 
      { message }
    </Typography>
  </Stack>
)

export default GridCardLayout

export { GridCardElement, GridMessage }