import DrawerLayout from "@mui/material/Drawer"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import ReceiptLong from '@mui/icons-material/ReceiptLong';
import Logout from '@mui/icons-material/Logout';
import { fontWeight } from "@root/appStyle"
import DarkMode from '@mui/icons-material/DarkMode';
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import { useLocation, useNavigate } from "react-router"

const drawerItems = [
  {
    id: 1,
    icon: <DarkMode />,
    text: "Inventario",
    path: "inventory"
  },
  {
    id: 2,
    icon: <ReceiptLong />,
    text: "Reporte",
    path: "inventory-report"
  }
]

const Drawer = ({ open, onClose }) => {
  let location = useLocation()

  const selected = drawerItems.find(e => location.pathname.split("/").includes(e.path))?.text

  const navigate = useNavigate()

  const handleClick = (item) => {
    navigate(item.path)
  }

  return (
    <DrawerLayout open={open} onClose={onClose}
      variant="temporary"
      anchor="right"
      sx={{
        ".MuiDrawer-paper": {
          bgcolor: "primary.main",
          paddingX: 2
        }
      }}
    >
      <List
        sx={{
          flexDirection: "column",
          flex: 1,
          marginTop: 5
        }}
      >
        <Stack sx={{ gap: 1 }}>
          { drawerItems.map(item => (
            <DrawerElement
              key={item.id}
              title={item.text}
              icon={item.icon}
              isSelected={item.text === selected}
              onClick={() => handleClick(item)}
            />
          )) }
        </Stack>
      </List>
      <List>
        <DrawerElement
          icon={<Logout />}
          title="Cerrar Sesión"
        />
      </List>
    </DrawerLayout>
  )
}

const DrawerElement = ({
  icon, title, isSelected, onClick
}) => {
  return (
    <ListItemButton 
      selected={isSelected}
      onClick={onClick}
      sx={{
        borderRadius: 4,
        "&.Mui-selected": {
          bgcolor: "accent.main"
        }
      }}
    >
      <ListItemIcon sx={{ color: "onPrimary.main" }}>
        { icon }
      </ListItemIcon>
      <ListItemText>
        <Typography variant="body1"
          sx={{
            fontWeight: fontWeight.semibold,
            color: "onPrimary.main"
          }}
        >
          { title }
        </Typography>
      </ListItemText>
    </ListItemButton>
  )
}

export default Drawer