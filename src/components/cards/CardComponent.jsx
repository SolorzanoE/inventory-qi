import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"

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
      elevation={0}
      sx={{
        width: "100%",
        height: "100%",
        minHeight: { xs: 300, sm: 350, md: 400 },
        borderRadius: 4,
        bgcolor: "surface.main",
        boxShadow: `1px 2px 6px ${style().shadow}`,
        display: "flex",
        flexDirection: "column"
      }}
    >
      <CardMedia
        component={image ? "img" : ""}
        image={image}
        sx={{
          bgcolor: style().image,
          height: 130
        }}
      />
      <CardContent 
        sx={{ 
          flex: 1,
          overflow: "hidden"
        }}
      >
        <Typography variant="h6" noWrap
          sx={{ fontWeight: fontWeight.semibold }}
        > 
          { title } 
        </Typography>
        <Typography variant="body2"
          sx={{
            display: "-webkit-box",
            fontWeight: fontWeight.medium,
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        > 
          { description }
        </Typography>
      </CardContent>
      <CardActions
        sx={{ px: 2, pb: 1.5 }}
      >
        <Typography component="div" variant="body2"
          sx={{ fontWeight: fontWeight.semibold }}
        >
          { footer }
        </Typography>
      </CardActions>
    </Card>
  )
}

export default CardComponent


