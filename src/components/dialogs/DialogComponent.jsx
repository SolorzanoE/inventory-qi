import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import { fontWeight } from "@root/appStyle"

const DialogComponent = ({ title, subTitle, children, onSubmit, onClose, onCancel, open, fullWidth }) => {
  return (
    <Dialog 
      open={open}
      maxWidth="lg"
      fullWidth={fullWidth}
      onClose={onClose}
      color="error"
      sx={{
        ".MuiDialog-paper": {
          bgcolor: "surface.main",
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle paddingBottom={0} color="onSurface"> { title } </DialogTitle>
      <DialogTitle variant="body1" sx={{ fontWeight: fontWeight.medium }}> { subTitle } </DialogTitle>
      <DialogContent>
        { children }
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          sx={{
            color: "onError.main",
            bgcolor: "error.main", 
            textTransform: "none"
          }}
        > 
          Cancelar 
        </Button>
        <Button
          onClick={onSubmit}
          sx={{
            color: "onSuccess.main",
            bgcolor: "success.main",
            textTransform: "none"
          }}
        > 
          Aceptar 
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DialogComponent