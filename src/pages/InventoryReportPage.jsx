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
import SearchComponent from "@src/components/searches/SearchComponent"
import { selectedCompanyEmptyMessage } from "@src/utils/messages"
import useSnackbar from "@src/hooks/useSnackbar"

const InventoryReportPage = () => {
  const dataCompany = useState("")

  const [companySelected] = dataCompany

  const searchData = useState("")

  const { showMessage } = useSnackbar()

  // [{}]
  const [reportData, setReportData] = useState([])

  const isDataCompanyEmpty = () => companySelected === ""

  const isReportDataEmpty = () => reportData.length === 0

  const addProduct = (product) => {
    setReportData(data => [...data, 1])
  }

  const handleEnter = (value) => {
    // Search product click enter
    if (isDataCompanyEmpty()) {
      showMessage(selectedCompanyEmptyMessage, "warning")
      return
    }

    const [_, setSearchValue] = searchData

    if (!companySelected) {
      showMessage("Hola", "warning")
      return
    }

    console.log(value)

    setSearchValue("")

    addProduct()
  }

  const scanProduct = () => {
    if (isDataCompanyEmpty()) {
      showMessage(selectedCompanyEmptyMessage, "warning")
      return
    }

    console.log("is scan")

    addProduct()
  }

  return (
    <Stack sx={{ height: "100%" }} spacing={2}>
      <Stack direction="row"
        sx={{
          alignItems: "center"
        }}
      >
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
        <Button
          sx={{
            typography: "body1",
            fontWeight: fontWeight.medium,
            textTransform: "none",
            borderRadius: 2,
            color: "onPrimary.main",
            bgcolor: "primary.main",
            width: { xs: 90, sm: 120}
          }}
        >
          Generar
        </Button>
      </Stack>
      <Stack direction={{xs: "column", sm: "row"}} spacing={2}
        sx={{
          alignItems: { sm: "center" }
        }}
      >
        <SelectComponent
          disabled={!isReportDataEmpty()}
          isRequired
          fieldName="company"
          stateValue={dataCompany}
          label="Empresa"
          options={[{ id: 1, nombre: "hola" }]}
        />
        <Stack direction="row"
          spacing={2}
          sx={{
            width: { sm: "500%" },
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <SearchComponent
            stateValue={searchData}
            onEnter={handleEnter} 
          />
          <IconButton
            onClick={scanProduct}
            sx={{ p: 0 }}
          >
            <AddRounded
              sx={{
                fontSize: 38,
                borderRadius: "50%",
                color: "onPrimary.main",
                bgcolor: isDataCompanyEmpty() ? "disabled.main" : "primary.main",
              }}
            />
          </IconButton>
        </Stack>
      </Stack>
      <Grid container
        spacing={{ xs: 1, sm: 2, md: 3 }}
        rowSpacing={{ xs: 3, sm: 2, md: 5 }}
        columns={{ xs: 2, sm: 3, md: 4, xl: 6 }}
        sx={{ flex: 1, overflow: "auto", pb: 3 }}
      >
        { reportData.map((data, index) => (
          <Grid size={1}
            key={index}
            sx={{ px: { xs: 1, sm: 1, md: 4 } }}
          >
            <Stack sx={{ alignItems: "center" }}>
              <CardComponent
                variant=""
                title="data.nombre_procto" description="data.descripcion_producto"
                footer={"hola"}
              />
            </Stack>
          </Grid>
        )) }
      </Grid>
    </Stack>
  )
}

export default InventoryReportPage