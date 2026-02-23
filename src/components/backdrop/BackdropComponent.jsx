import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"

const BackdropComponent = ({ open }) => {
  return (
    <Backdrop
      sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="onBackground" />
    </Backdrop>
  )
}

export default BackdropComponent