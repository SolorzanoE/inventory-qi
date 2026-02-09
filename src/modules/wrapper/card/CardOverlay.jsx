import Box from "@mui/material/Box"

const CardOverlay = ({ element, children }) => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      position: 'relative',
    }}
  >
    { children }
    <Box
      sx={{
        position: 'absolute',
        top: 10,
        maxWidth: "100%",
        right: 10,
        zIndex: 1
      }}
    >
      { element }
    </Box>
  </Box>
)

export default CardOverlay