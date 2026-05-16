import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import CardComponent from "@src/components/cards/CardComponent"
import SearchComponent from "@src/components/searches/SearchComponent"
import SelectComponent from "@src/components/selects/SelectComponent"
import useCompanyList from "@src/hooks/api/get/useCompanyList"
import useProductExistenceByCompanyList from "@src/hooks/api/get/useProductExistenceByCompanyList"
import useProductExistenceByCompanyWarehouseList from "@src/hooks/api/get/useProductExistenceByCompanyWarehouseList"
import useSearchProductByCompanyList from "@src/hooks/api/get/useSearchProductByCompanyList"
import useSearchProductByCompanyWarehouseList from "@src/hooks/api/get/useSearchProductByCompanyWarehouseList"
import useWarehouseByCompanyList from "@src/hooks/api/get/useWarehouseByCompanyList"
import useSnackbar from "@src/hooks/useSnackbar"
import { productNotFoundMessage, selectedCompanyEmptyMessage } from "@src/utils/messages"
import { useEffect, useState } from "react"
import SavedSearch from '@mui/icons-material/SavedSearch';
import Skeleton from "@mui/material/Skeleton"
import GridCardLayout, { GridCardElement, GridMessage } from "@src/layouts/GridCardLayout"
import CardOverlay from "@src/modules/wrapper/card/CardOverlay"
import { fontWeight } from "@root/appStyle"
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';
import { numberToMoney } from "@src/utils/numberFormat"
import Pagination from "@mui/material/Pagination"

const InventoryPage = () => {
  const { request: companyRequest, responseService: companyResponse } = useCompanyList()

  const { request: warehouseRequest, responseService: warehouseResponse } = useWarehouseByCompanyList()

  const { request: searchProductByCompany, behaivorService: behaivorSearchProductByCompany } = useSearchProductByCompanyList()

  const { request: searchProductByCompanyWarehouse, behaivorService: behaivorSearchProductByCompanyWarehouse } = useSearchProductByCompanyWarehouseList()

  const { request: productExistenceByCompany, behaivorService: behaivorProductExistenceByCompany } = useProductExistenceByCompanyList()

  const { request: productExistenceByCompanyWarehouse, behaivorService: behaivorProductExistenceByCompanyWarehouse } = useProductExistenceByCompanyWarehouseList()

  const { showMessage } = useSnackbar()

  // [{ nombre, descripcion, existencia, ultimoCosto }]
  const [products, setProducts] = useState(new Array(0).fill({nombre: "1"}))

  const [searchValue, setSearchValue] = useState("")

  const [selectedOptions, setSelectedOptions] = useState({
    company: "",
    warehouse: ""
  })

  const option = {
    companies: companyResponse ?? [],
    warehouses: warehouseResponse ?? []
  }

  const isSearchingProducts = behaivorSearchProductByCompany.loading || behaivorSearchProductByCompanyWarehouse.loading || behaivorProductExistenceByCompany.loading || behaivorProductExistenceByCompanyWarehouse.loading

  useEffect(() => { companyRequest() }, [])

  useEffect(() => {
    if (selectedOptions.warehouse)
      return
    
    const load = async () => {    
      warehouseRequest(selectedOptions.company)
      const response = await productExistenceByCompany(selectedOptions.company)
      setProducts(response ?? [])
    }

    if (selectedOptions.company)
      load()
  }, [selectedOptions.company])

  useEffect(() => {
    const load = async () => {
      const response = await productExistenceByCompanyWarehouse(selectedOptions.company, selectedOptions.warehouse)   
      setProducts(response ?? [])
    }

    if (selectedOptions.warehouse)
      load()
  }, [selectedOptions.warehouse])

  const handleSearch = async (value) => {
    if (value === "") 
      return

    if (isSearchingProducts)
      return

    if (!selectedOptions.company) {
      showMessage(selectedCompanyEmptyMessage, "warning")
      return
    }

    let response = null

    if (!selectedOptions.warehouse) {
      response = await searchProductByCompany(selectedOptions.company, value)
    } else {
      response = await searchProductByCompanyWarehouse(selectedOptions.company, selectedOptions.warehouse, value)
    }

    setProducts(response ?? [])

    setSearchValue("")
  }

  return (
    <Stack spacing={2} sx={{ height: "100%" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: fontWeight.semibold,
          color: "onBackground.main",
          alignContent: "center"
        }}
      >
        Inventario de Productos
      </Typography>

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
            fieldName="company"
            stateValue={[selectedOptions, setSelectedOptions]}
            label="Empresa"
            options={option.companies}
          />
          <SelectComponent 
            disabled={!selectedOptions.company}
            fieldName="warehouse"
            stateValue={[selectedOptions, setSelectedOptions]}
            label="Almácen"
            options={option.warehouses}
          />
        </Stack>
        
        <SearchComponent 
          stateValue={[searchValue, setSearchValue]} 
          onEnter={handleSearch}
        />
      </Stack>

      <GridCardLayout>
        { (products === null && !isSearchingProducts) && 
          <GridMessage 
            message={"Empieza buscando productos"} 
            icon={<SavedSearch sx={{ fontSize: 120 }} color="disabled" />} 
          /> 
        }
        { (products?.length === 0 && !isSearchingProducts) && 
          <GridMessage 
            message={productNotFoundMessage}
            icon={<SentimentVeryDissatisfied sx={{ fontSize: 120 }} color="disabled" />} 
          /> 
        }
        { isSearchingProducts ? 
          new Array(12).fill(0).map((_, index) => (
            <GridCardElement key={index}> 
              <Skeleton variant="rectangular" 
                sx={{
                  width: "100%",
                  height: "100%",
                  minHeight: 300,
                  borderRadius: 4
                }}
              /> 
            </GridCardElement>
          )) :
          products?.map((element) => (
            <GridCardElement key={element.id}> 
              <CardOverlay
                element={
                  <Typography
                    sx={{
                      marginLeft: 2,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      color: "onBackground.main",
                      fontWeight: fontWeight.medium,
                      bgcolor: "background.main",
                      px: 1,
                      borderRadius: 2
                    }}
                  >
                    { numberToMoney(element.ultimoCosto) }
                  </Typography>
                }
              >
                <CardComponent 
                  variant={element.existencia !== 0 ? "normal" : "danger"}
                  title={element.nombre} 
                  description={element.descripcion}
                  footer={`Existencia: ${element.existencia}`} 
                />
              </CardOverlay>
            </GridCardElement>
          ))
        }
      </GridCardLayout> 
      <Pagination />
    </Stack>
  )
}

export default InventoryPage