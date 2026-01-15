import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/app-style"

const CardComponent = ({
  variant = "normal",
  image,
  title,
  description,
  footer
}) => {
  const theme = useTheme()

  const style = () => {
    switch(variant) {
    case "normal": 
      return { shadow: theme.palette.accent.main, image: theme.palette.border.main }
    case "danger":
      return { shadow: theme.palette.error.main, image: theme.palette.error.main }
    default:
      return { shadow: theme.palette.accent.main, image: theme.palette.border.main }
    }
  }
  return (
    <Card
      sx={{
        width: 280,
        height: 300,
        borderRadius: 4,
        bgcolor: "surface.main",
        boxShadow: `1px 2px 6px ${style().shadow}`,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardMedia
        component="img"
        image={image}
        sx={{
          bgcolor: style().image,
          minHeight: 130,
        }}
      >

      </CardMedia>
      <CardContent 
        sx={{ 
          display: "flex", 
          flexDirection: "column", 
          flex: 1,
        }}
      >
        <Typography variant="h6"
          sx={{ fontWeight: fontWeight.semibold }}
        > 
          { title } 
        </Typography>
        <Typography 
          sx={{ 
            // TODO: compose text wrap
            flex: 1,
            fontWeight: fontWeight.medium
          }}
        > 
          { description }
        </Typography>
        <Typography variant="body2"
          sx={{ fontWeight: fontWeight.semibold }}
        >
          { footer }
        </Typography>
      </CardContent>
    </Card>
  )
}

export default CardComponent


