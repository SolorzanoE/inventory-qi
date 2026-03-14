import Menu from '@mui/icons-material/Menu';
import Footer from "@src/modules/footer/Footer"
import Header from "@src/modules/header/Header"
import Drawer from '@src/modules/drawer/Drawer';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router';
import Stack from '@mui/material/Stack';

const MainLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = () => setOpenDrawer(!openDrawer)

  return (
    <Stack sx={{ height: "100dvh" }}>
      <Drawer
        open={openDrawer} 
        onClose={toggleDrawer} 
      />
      <Header 
        actionButtons={[{ icon: <Menu />, onClick: toggleDrawer }]} 
        redirect="/app"
      />
      <Container maxWidth
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          overflow: "auto",
          bgcolor: "background.main",
          paddingBlock: 2,
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  )
}

export default MainLayout