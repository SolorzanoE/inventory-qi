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
import GridCardLayout, { GridCardElement } from "@src/layouts/GridCardLayout"
import CardOverlay from "@src/modules/wrapper/card/CardOverlay"
import { fontWeight } from "@root/appStyle"
import SentimentVeryDissatisfied from '@mui/icons-material/SentimentVeryDissatisfied';

const InventoryPage = () => {
  const { request: companyRequest, responseService: companyResponse } = useCompanyList()

  const { request: warehouseRequest, responseService: warehouseResponse } = useWarehouseByCompanyList()

  const { request: searchProductByCompany, behaivorService: behaivorSearchProductByCompany } = useSearchProductByCompanyList()

  const { request: searchProductByCompanyWarehouse, behaivorService: behaivorSearchProductByCompanyWarehouse } = useSearchProductByCompanyWarehouseList()

  const { request: productExistenceByCompany, behaivorService: behaivorProductExistenceByCompany } = useProductExistenceByCompanyList()

  const { request: productExistenceByCompanyWarehouse, behaivorService: behaivorProductExistenceByCompanyWarehouse } = useProductExistenceByCompanyWarehouseList()

  const { showMessage } = useSnackbar()

  // [{ nombre, descripcion, existencia, ultimoCosto }]
  const [products, setProducts] = useState(null)

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

  const handleSearchEnter = async (value) => {
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
          onEnter={handleSearchEnter}
        />
      </Stack>
      <GridCardLayout>
        { (products === null && !isSearchingProducts) && 
          <MessageElement 
            message={"Empieza buscando productos"} 
            icon={<SavedSearch sx={{ fontSize: 120 }} color="disabled" />} 
          /> 
        }
        { (products?.length === 0 && !isSearchingProducts) && 
          <MessageElement 
            message={productNotFoundMessage}
            icon={<SentimentVeryDissatisfied sx={{ fontSize: 120 }} color="disabled" />} 
          /> 
        }
        { isSearchingProducts ? 
          new Array(10).fill(0).map((_, index) => (
            <GridCardElement key={index}> 
              <Skeleton variant="rectangular" 
                sx={{
                  width: "100%",
                  maxWidth: 300,
                  height: 300,
                  borderRadius: 4
                }}
              /> 
            </GridCardElement>
          )) :
          products?.map((element, index) => (
            <GridCardElement key={index}> 
              <Stack sx={{ alignItems: "center" }}>
                <CardOverlay
                  element={
                    <Typography
                      sx={{
                        color: "onBackground.main",
                        fontWeight: fontWeight.medium,
                        bgcolor: "background.main",
                        px: 1,
                        borderRadius: 2
                      }}
                    >
                      { `$${element.ultimoCosto}` }
                    </Typography>
                  }
                >
                  <CardComponent 
                    variant={element.existencia !== 0 ? "normal" : "danger"}
                    title={element.nombre} 
                    description={element.description}
                    footer={`Existencia: ${element.existencia}`} 
                  />
                </CardOverlay>
              </Stack>
            </GridCardElement>
          ))
        }
      </GridCardLayout>
    </Stack>
  )
}

const MessageElement = ({ message, icon }) => (
  <Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    { icon }
    <Typography variant="h6" sx={{ color: "disabled.main", fontWeight: fontWeight.semibold, textAlign: "center" }}> 
      { message }
    </Typography>
  </Stack>
)

export default InventoryPage