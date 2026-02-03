import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import SelectComponent from "@src/components/selects/SelectComponent"
import { useEffect, useState } from "react"
import CardComponent from "@src/components/cards/CardComponent"
import SearchComponent from "@src/components/searches/SearchComponent"
import { selectedCompanyEmptyMessage } from "@src/utils/messages"
import useSnackbar from "@src/hooks/useSnackbar"
import useCompanyList from "@src/hooks/api/get/useCompanyList"
import useSearchProductByCompanyList from "@src/hooks/api/get/useSearchProductByCompanyList"
import CameraAlt from '@mui/icons-material/CameraAlt';
import GridCardLayout, { GridCardElement } from "@src/layouts/GridCardLayout"
import SavedSearch from '@mui/icons-material/SavedSearch';
import InputComponent from "@src/components/inputs/InputComponent"
import Backdrop from "@mui/material/Backdrop"
import CircularProgress from "@mui/material/CircularProgress"
import DialogComponent from "@src/components/dialogs/DialogComponent"
import CardAction from "@src/modules/wrapper/card/CardAction"
import CloseRounded from '@mui/icons-material/CloseRounded';
import CheckCircle from '@mui/icons-material/CheckCircle';
import useReportComparationList from "@src/hooks/api/post/useReportComparationList"
import CardOverlay from "@src/modules/wrapper/card/CardOverlay"

const InventoryReportPage = () => {
  const { request: companyRequest, responseService: companyResponse } = useCompanyList()

  const { request: searchProduct, responseService: responseSearchProduct, behaivorService: behaivorSearchProduct } = useSearchProductByCompanyList()

  const { request: requestReport } = useReportComparationList()

  const { showMessage } = useSnackbar()

  const [companySelected, setCompanySelected] = useState("")

  // [{}]
  const [reportData, setReportData] = useState([])

  const [searchValue, setSearchValue] = useState("")

  const [inputCards, setInputCards] = useState({})

  const [selectedCards, setSelectedCards] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const companyOptions = companyResponse ?? []

  const isCompanySelectedEmpty = companySelected === ""

  const isReportDataEmpty = reportData.length === 0

  useEffect(() => { companyRequest() }, [])

  const addProduct = (product) => {
    setReportData(data => {
      if (!data.some(e => e.id === product.id)) {
        return [...data, product]
      }

      showMessage(`El producto ${product.nombre} ya fue agregado`, "error")

      return data
    })
  }

  const handleSearchEnter = async (value) => {
    if (value === "")
      return

    // Search product click enter
    if (isCompanySelectedEmpty) {
      showMessage(selectedCompanyEmptyMessage, "warning")
      return
    }

    let product = await searchProduct(companySelected, value)

    setSearchValue("")

    if (product.length === 1) {
      addProduct(...product)
    } else {
      setOpenDialog(true)
    }  
  }

  const scanProduct = () => {
    if (isCompanySelectedEmpty) {
      showMessage(selectedCompanyEmptyMessage, "warning")
      return
    }

    console.log("is scan")

    addProduct()
  }

  const handleGenerate = async (e) => {
    e.preventDefault()

    const requestData = reportData.map(data => ({
      id: data.id,
      cantidad: Number(inputCards[`${data.id}_${data.nombre}`])
    }))

    if (Object.values(requestData).some((value) => Number(value.cantidad) < 0)) {
      showMessage("No se permiten valores negativos", "error")
      return
    }
    
    const response = await requestReport(companySelected, requestData)
    
    if (response) {
      setReportData([])
      setInputCards([])
    }
  }

  const toggleSelectedCard = (element) => {
    if (selectedCards.find(e => e.id === element.id)) {
      setSelectedCards(prev => prev.filter(e => e.id !== element.id))
      return 
    }

    setSelectedCards(prev => [...prev, element])
  }

  const closeDialog = () => {
    setOpenDialog(false)
    setSelectedCards([])
  }

  const handleDialogSubmit = () => {
    selectedCards.forEach(e => addProduct(e))
    closeDialog()
  }

  const handleDialogCancel = () => closeDialog()

  const handleDeleteCard = (id) =>
    setReportData(report => report.filter(e => e.id !== id))

  return (
    <>
      <DialogComponent
        open={openDialog}
        title="Productos Similares"
        subTitle="Selecciona los productos que necesites"
        fullWidth
        onSubmit={handleDialogSubmit}
        onCancel={handleDialogCancel}
      >
        <GridCardLayout>
          { responseSearchProduct?.map((element) => (
            <GridCardElement key={element.id}>
              <Stack sx={{ alignItems: "center" }}>
                <CardAction onClick={() => toggleSelectedCard(element)}>
                  <CardOverlay
                    element={
                      selectedCards.find(e => e.id === element.id) ? 
                        <CheckCircle color="success" fontSize="large" /> : 
                        <></>
                    }
                  >
                    <CardComponent
                      title={element.nombre}
                      description={element.descripcion}
                    />
                  </CardOverlay>
                </CardAction>
              </Stack>
            </GridCardElement>
          )) }
        </GridCardLayout>
      </DialogComponent>
      <Backdrop
        sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })}
        open={behaivorSearchProduct.loading}
      >
        <CircularProgress color="onBackground" />
      </Backdrop>
      <Stack component="form" onSubmit={handleGenerate} 
        spacing={2}
        sx={{ height: "100%" }} 
      >
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
            type="submit"
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
            disabled={!isReportDataEmpty}
            fieldName="company"
            stateValue={[companySelected, setCompanySelected]}
            label="Empresa"
            options={companyOptions}
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
              stateValue={[searchValue, setSearchValue]}
              onEnter={handleSearchEnter} 
            />
            <IconButton
              onClick={scanProduct}
              sx={{ p: 0 }}
            >
              <CameraAlt
                sx={{
                  fontSize: 38,
                  padding: 0.75,
                  borderRadius: "50%",
                  color: "onPrimary.main",
                  bgcolor: isCompanySelectedEmpty ? "disabled.main" : "primary.main",
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
        <GridCardLayout>
          { (isReportDataEmpty && !behaivorSearchProduct.loading) && 
            <Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <SavedSearch sx={{ fontSize: 100 }} color="disabled"/>
              <Typography variant="h6" sx={{ color: "disabled.main", textAlign: "center" }}> 
                Empieza agregando productos 
              </Typography>
            </Stack>
          }
          { reportData.map((data) => (
            <GridCardElement key={data.id}>
              <Stack sx={{ alignItems: "center" }}>
                <CardOverlay 
                  element={
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCard(data.id)}
                      sx={{ 
                        p: 0.1,
                        bgcolor: "error.main",
                        "&.MuiIconButton-root": {
                          "&:hover": {
                            bgcolor: "error.main"
                          }
                        }
                      }}
                    >
                      <CloseRounded sx={{ p: 0.4, color: "onError.main", fontSize: 30 }}/>
                    </IconButton>
                  }
                >
                  <CardComponent
                    title={data.nombre}
                    description={data.descripcion}
                    footer={
                      <InputComponent isRequired
                        fieldName={`${data.id}_${data.nombre}`}  
                        label="Cantidad" 
                        error={inputCards[`${data.id}_${data.nombre}`] < 0}
                        messageError="No se permiten números negativos"
                        type="number"
                        stateValue={[inputCards, setInputCards]}
                      />
                    }
                  />
                </CardOverlay>
              </Stack>
            </GridCardElement>
          )) }
        </GridCardLayout>
      </Stack>
    </>
  )
}

export default InventoryReportPage