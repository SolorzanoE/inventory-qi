import Menu from '@mui/icons-material/Menu';
import Footer from "@src/modules/footer/Footer"
import Header from "@src/modules/header/Header"
import Drawer from '@src/modules/drawer/Drawer';
import { useState } from 'react';
import Container from '@mui/material/Container';
import { Outlet } from 'react-router';

const MainLayout = () => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const toggleDrawer = () => setOpenDrawer(!openDrawer)

  return (
    <>
      <Drawer
        open={openDrawer} 
        onClose={toggleDrawer} 
      />
      <Header 
        actionButtons={[{ icon: <Menu />, onClick: toggleDrawer }]} 
      />
      <Container maxWidth="xl"
        sx={{
          height: "90dvh",
          bgcolor: "background.main",
          paddingTop: 4
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default MainLayout