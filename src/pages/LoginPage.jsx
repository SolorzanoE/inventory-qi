import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import Footer from "@src/modules/footer/Footer"
import Header from "@src/modules/header/Header"
import Person from '@mui/icons-material/Person';
import Lock from '@mui/icons-material/Lock';
import InputComponent from "@src/components/inputs/InputComponent"
import { useState } from "react"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"
import { alpha } from "@mui/material/styles"
import { useNavigate } from "react-router"
import Visibility from '@mui/icons-material/Visibility';
import IconButton from "@mui/material/IconButton"
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = () => {
  const loginModel = {
    user: "",
    password: ""
  }

  const loginData = useState(loginModel);

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    handleReset()
    navigate("/app/inventory")
  }
  
  const handleReset = () => {
    const [_, setData] = loginData
    setData(loginModel)
  }

  return (
    <>
      <Header />
      <Container maxWidth="xl"
        sx={{
          display: "flex",
          height: "90dvh",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.main"
        }}
      >
        <Box
          sx={(theme) => ({
            bgcolor: alpha(theme.palette.surface.main, 0.2),
            padding: { xs: 6, sm: 7, md: 12, lg: 15 },
            paddingY: { xs: 12, sm: 12 },
            borderRadius: 6,
            boxShadow: `2px 2px 10px ${theme.palette.border.main}`
          })}
        >
          <Stack spacing={8}
            sx={{
              alignItems: "center"
            }}
          >
            <Typography
              color="onBackground"
              variant="h4"
              sx={{
                fontWeight: fontWeight.medium,
              }}
            >
              Login
            </Typography>
            <Stack component="form"
              spacing={3}
              onSubmit={handleSubmit}
            >
              <InputComponent 
                fieldName="user"
                labelIcon={<Person />}
                label="Usuario"
                isRequired
                stateValue={loginData} 
              />
              <InputComponent 
                fieldName="password"
                labelIcon={<Lock />}
                label="Contraseña"
                isRequired
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <IconButton
                    color="onBackground"
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{ mx: 0.5, p: 0.2 }} 
                  >
                    { showPassword ? 
                      <VisibilityOff sx={{ fontSize: 20 }} /> : 
                      <Visibility sx={{ fontSize: 20 }} /> 
                    }
                  </IconButton>
                }
                stateValue={loginData} 
              />
              <Button 
                type="submit" 
                fullWidth
                sx={{
                  top: 20,
                  textTransform: "none",
                  typography: "body1",
                  fontWeight: fontWeight.medium,
                  color: "onPrimary.main",
                  bgcolor: "primary.main",
                  borderRadius: 2
                }}
              > 
                Iniciar Sesión 
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  )
}

export default LoginPage