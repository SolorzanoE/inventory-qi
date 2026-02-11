import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import { fontWeight } from "@root/appStyle"
import SelectComponent from "@src/components/selects/SelectComponent"
import { useEffect, useState } from "react"
import CardComponent from "@src/components/cards/CardComponent"
import SearchComponent from "@src/components/searches/SearchComponent"
import { negativeValueMessage, productAddedMessage, productNotFoundMessage } from "@src/utils/messages"
import useSnackbar from "@src/hooks/useSnackbar"
import useCompanyList from "@src/hooks/api/get/useCompanyList"
import useSearchProductByCompanyList from "@src/hooks/api/get/useSearchProductByCompanyList"
import CameraAlt from '@mui/icons-material/CameraAlt';
import GridCardLayout, { GridCardElement, GridMessage } from "@src/layouts/GridCardLayout"
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
import { exportToExcel } from "@src/utils/exportData"
import ScannerCode from "@src/modules/scanner/ScannerCode"
import useWarehouseByCompanyList from "@src/hooks/api/get/useWarehouseByCompanyList"
import { numberToMoney } from "@src/utils/numberFormat"

const InventoryReportPage = () => {
  const { request: companyRequest, responseService: companyResponse } = useCompanyList()

  const { request: warehouseRequest, responseService: warehouseResponse } = useWarehouseByCompanyList()

  const { request: searchProduct, responseService: responseSearchProduct, behaivorService: behaivorSearchProduct } = useSearchProductByCompanyList()

  const { request: requestReport, behaivorService: behaivorServiceReport } = useReportComparationList()

  const { showMessage } = useSnackbar()

  const [selectedOptions, setSelectedOptions] = useState({
    company: "",
    warehouse: ""
  })

  const [reportData, setReportData] = useState([])

  const [searchValue, setSearchValue] = useState("")

  const [inputCards, setInputCards] = useState({})

  const [selectedCards, setSelectedCards] = useState([])

  const [openDialog, setOpenDialog] = useState(false)

  const [openScan, setOpenScan] = useState(false)

  const option = {
    companies: companyResponse ?? [],
    warehouses: warehouseResponse ?? []
  }

  const isSelectedOptionsEmpty = !(selectedOptions.company && selectedOptions.warehouse)

  const isReportDataEmpty = reportData.length === 0

  useEffect(() => { companyRequest() }, [])

  useEffect(() => {
    if (selectedOptions.company) {
      warehouseRequest(selectedOptions.company)
    }
  }, [selectedOptions.company])

  const addProduct = (product) => {
    setReportData(data => {
      if (!data.some(e => e.id === product.id)) {
        showMessage(productAddedMessage, "success")
        return [...data, product]
      }

      showMessage(`El producto ${product.nombre} ya fue agregado`, "error")

      return data
    })
  }

  const handleSearch = async (value) => {
    if (isSelectedOptionsEmpty) {
      showMessage("Faltan campos por seleccionar", "warning")
      return
    }

    if (value === "")
      return

    if (behaivorSearchProduct.loading) 
      return

    let product = await searchProduct(selectedOptions.company, value)

    setSearchValue("")

    if (product.length === 0) {
      showMessage(productNotFoundMessage, "error")
      return
    }

    if (product.length === 1) {
      addProduct(...product)
    } else {
      setOpenDialog(true)
    }  
  }

  const scanProduct = () => {
    if (isSelectedOptionsEmpty) {
      showMessage("Faltan campos por seleccionar", "warning")
      return
    }

    setOpenScan(true)
  }

  const handleCloseScan = () => setOpenScan(false)

  const handleDetectScan = (result) => {
    handleSearch(`${result.text}`)
    handleCloseScan()
  }

  const handleGenerate = async (e) => {
    e.preventDefault()

    if (reportData.length === 0) {
      showMessage("Agrega productos para generar el reporte", "warning")
      return
    }

    const requestData = reportData.map(data => ({
      idProducto: data.id,
      cantidad: Number(inputCards[`${data.id}_${data.nombre}`])
    }))

    if (Object.values(requestData).some((value) => Number(value.cantidad) < 0)) {
      showMessage(negativeValueMessage, "error")
      return
    }
    
    const response = await requestReport(selectedOptions.company, selectedOptions.warehouse, requestData)

    if (response) {
      const warehouseName = option.warehouses.find(e => e.id == selectedOptions.warehouse)?.nombre

      const columns = [
        { header: "Producto", key: "nombreP" }, 
        { header: "Código", key: "codigo" }, 
        { header: "Cantidad Contada", key: "cantidadEnviada" }, 
        { header: "Existencia", key: "existenciaSistema" }, 
        { header: "Diferencia", key: "diferencia" },
        { header: "Costo", key: "ultimoCosto" },
        { header: "Total", key: "total" }
      ]
      
      const data = response.map(e => ({
        ...e,
        total: Number(`${e.ultimoCosto * e.diferencia}`)
      }))

      const customSheet = (sheet) => {
        sheet.headerFooter = { firstHeader: warehouseName }

        sheet.getColumn("total").numFmt = '"$"#,##0.00;[Red]"$"#,##0.00'
        sheet.getColumn("ultimoCosto").numFmt = '"$"#,##0.00'
        
        const total = data.reduce((accum, current) => (accum + current.total), 0)

        const totalRow = sheet.insertRow(sheet.rowCount + 2, ["Total", numberToMoney(total)])

        totalRow.font = { bold: true }
      }

      exportToExcel(data, columns, warehouseName, customSheet)

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
    if (selectedCards.length === 0) {
      showMessage("Selecciona productos para continuar", "warning")
      return
    }

    selectedCards.forEach(e => addProduct(e))
    closeDialog()
  }

  const handleDialogCancel = () => closeDialog()

  const handleDeleteCard = (id) => {
    setReportData(report => report.filter(e => e.id !== id))
    setInputCards(input => {
      const newInput = { ...input }

      Object.keys(newInput).forEach(key => {
        if (key.includes(id)) {
          delete newInput[key]
        }
      })

      return newInput
    })
  }
  
  if (openScan) {
    return (
      <ScannerCode onDetect={handleDetectScan} onClose={handleCloseScan} />
    )
  }

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
        open={behaivorSearchProduct.loading || behaivorServiceReport.loading}
      >
        <CircularProgress color="onBackground" />
      </Backdrop>
      <Stack component="form" onSubmit={handleGenerate} 
        onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
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
        <Stack
          direction={{ sx: "column", sm: "row" }}
          sx={{
            alignItems: { md: "center", sm: "center" },
            gap: 2
          }}
        >
          <Stack direction="row"
            spacing={2} 
            sx={{ 
              minWidth: 300,
              alignItems: "center"
            }}
          >
            <SelectComponent
              disabled={!isReportDataEmpty}
              fieldName="company"
              stateValue={[selectedOptions, setSelectedOptions]}
              label="Empresa"
              options={option.companies}
            />
            <SelectComponent
              disabled={!selectedOptions.company}
              fieldName="warehouse"
              stateValue={[selectedOptions, setSelectedOptions]}
              label="Almacen"
              options={option.warehouses}
            />
          </Stack>
          <Stack direction="row"
            spacing={2}
            sx={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <SearchComponent
              stateValue={[searchValue, setSearchValue]}
              onEnter={handleSearch} 
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
                  bgcolor: isSelectedOptionsEmpty ? "disabled.main" : "primary.main",
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
        <GridCardLayout>
          { (isReportDataEmpty && !behaivorSearchProduct.loading) && 
            <GridMessage
              message={"Empieza agregando productos "}
              icon={<SavedSearch sx={{ fontSize: 120 }} color="disabled" />}
            />
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