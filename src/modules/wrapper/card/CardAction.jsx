import CardActionArea from "@mui/material/CardActionArea"

const CardAction = ({ onClick, children, borderRadius = 4 }) => {
  return (
    <CardActionArea 
      onClick={onClick}
      sx={{ 
        borderRadius: borderRadius 
      }}
    >
      { children }
    </CardActionArea>
  )
}

export default CardAction