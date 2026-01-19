import Alert from "@mui/material/Alert"
import Slide from "@mui/material/Slide"
import Snackbar from "@mui/material/Snackbar"
import { useState } from "react"
import { SnackbarContext } from "@src/providers/context/ContextApp"

const SnackbarProvider = ({ children }) => {
  const [snackbarBehaivor, setSnackbarBehaivor] = useState({
    message: "",
    isOpen: false,
    type: "success"
  })

  const showMessage = (message, type = "success") =>
    setSnackbarBehaivor(behaivor => ({ ...behaivor, message, type, isOpen: true }))

  const handleClose = () =>
    setSnackbarBehaivor(behaivor => ({ ...behaivor, isOpen: false }))

  return (
    <SnackbarContext.Provider value={{ showMessage }}>
      { children }
      <Snackbar 
        open={snackbarBehaivor.isOpen}
        slots={{ transition: Slide }}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert
          onClose={handleClose}
          severity={snackbarBehaivor.type}
          variant="outlined"
          sx={(theme) => ({ 
            width: '100%', 
            bgcolor: "background.main",
            borderRadius: 3,
            boxShadow: `-1px 1px 3px ${theme.palette.onBackground.main}`,
            "&.MuiAlert-colorError .MuiAlert-icon": {
              color: "error.main"
            },
            "&.MuiAlert-colorInfo .MuiAlert-icon": {
              color: "blue"
            },
            "&.MuiAlert-colorSuccess .MuiAlert-icon": {
              color: "success.main"
            },
            "&.MuiAlert-colorWarning .MuiAlert-icon": {
              color: "yellow"
            }
          })}
        >
          { snackbarBehaivor.message }
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

export default SnackbarProvider