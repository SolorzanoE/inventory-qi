import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import AddRounded from '@mui/icons-material/AddRounded';
import Grid from "@mui/material/Grid"
import SelectComponent from "@src/components/selects/SelectComponent"
import { useState } from "react"
import CardComponent from "@src/components/cards/CardComponent"

const InventoryReportPage = () => {
  return (
    <Stack sx={{ height: "100%" }} spacing={2}>
      <Stack direction="row">
        <Typography 
          variant="h5" 
          sx={{ 
            flex: 1,
            fontWeight: fontWeight.semibold,
            color: "onBackground.main",
            alignContent: "center"
          }}
        >
          Reporte de Productos
        </Typography>
        <ActionInventoryReport 
          properties={{
            display: { xs: "none", sm: "flex" },
            flex: 1
          }} 
        />
      </Stack>
      <Grid container 
        spacing={{ xs: 1, sm: 2, md: 3 }}
        rowSpacing={{ xs: 3, sm: 2, md: 5 }}
        columns={{ xs: 2, sm: 3, md: 4, xl: 6 }}
        sx={{ flex: 1, overflow: "auto", pb: 3 }}
      >
        { new Array(10).fill(0).map((_, index) => (
          <Grid size={1}
            key={index}
            sx={{ px: { xs: 1, sm: 1, md: 4 } }}
          > 
            <Stack sx={{ alignItems: "center" }}>
              <CardComponent footer={"hola"} title="hola" description="holass" variant="" />
            </Stack>
          </Grid>
        )) }
      </Grid>
      <ActionInventoryReport properties={{ display: { xs: "flex", sm: "none" }, pb: 3 }} />
    </Stack>
  )
}

const ActionInventoryReport = ({ properties }) => {
  const dataCompany = useState("")

  return (
    <Stack direction="row" 
      spacing={2}
      sx={{
        ...properties,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <SelectComponent
        isRequired
        fieldName="company"
        stateValue={dataCompany}
        label="Empresa"
        options={[{ id: 1, nombre: "hola" }]}
      />
      <Button
        sx={{
          typography: "body1",
          fontWeight: fontWeight.medium,
          textTransform: "none",
          borderRadius: 2,
          color: "onPrimary.main",
          bgcolor: "primary.main",
          maxWidth: 150,
          minWidth: 130
        }}
      >
        Generar
      </Button>
      <IconButton
        sx={{ p: 0 }}
      >
        <AddRounded
          sx={{
            fontSize: 38,
            borderRadius: "50%",
            color: "onPrimary.main",
            bgcolor: "primary.main"
          }}
        />
      </IconButton>
    </Stack>
  )
}

export default InventoryReportPage