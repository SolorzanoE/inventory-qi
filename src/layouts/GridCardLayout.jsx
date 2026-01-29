import Grid from "@mui/material/Grid"

const GridCardLayout = ({ children }) => (
  <Grid container
    spacing={{ xs: 1, sm: 2, md: 3 }}
    rowSpacing={{ xs: 3, sm: 2, md: 5 }}
    columns={{ xs: 2, sm: 3, md: 4, xl: 6 }}
    sx={{ flex: 1, overflow: "auto", pb: 3 }}
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

export default GridCardLayout

export { GridCardElement }