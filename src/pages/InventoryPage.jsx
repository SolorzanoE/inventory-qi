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
import { selectedCompanyEmptyMessage } from "@src/utils/messages"
import { useEffect, useState } from "react"
import SavedSearch from '@mui/icons-material/SavedSearch';
import Skeleton from "@mui/material/Skeleton"
import GridCardLayout, { GridCardElement } from "@src/layouts/GridCardLayout"
import CardOverlay from "@src/modules/wrapper/card/CardOverlay"
import { fontWeight } from "@root/appStyle"

const InventoryPage = () => {
  const { request: companyRequest, responseService: companyResponse } = useCompanyList()

  const { request: warehouseRequest, responseService: warehouseResponse } = useWarehouseByCompanyList()

  const { request: searchProductByCompany, behaivorService: behaivorSearchProductByCompany } = useSearchProductByCompanyList()

  const { request: searchProductByCompanyWarehouse, behaivorService: behaivorSearchProductByCompanyWarehouse } = useSearchProductByCompanyWarehouseList()

  const { request: productExistenceByCompany, behaivorService: behaivorProductExistenceByCompany } = useProductExistenceByCompanyList()

  const { request: productExistenceByCompanyWarehouse, behaivorService: behaivorProductExistenceByCompanyWarehouse } = useProductExistenceByCompanyWarehouseList()

  const { showMessage } = useSnackbar()

  // [{ nombre, descripcion, existencia, ultimoCosto }]
  const [products, setProducts] = useState([])

  const [searchValue, setSearchValue] = useState("")

  const [selectedData, setSelectedData] = useState({
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
      warehouseRequest(selectedData.company)
      const response = await productExistenceByCompany(selectedData.company)
      setProducts(response ?? [])
    }

    if (selectedData.company)
      load()
  }, [selectedData.company])

  useEffect(() => {
    const load = async () => {
      const response = await productExistenceByCompanyWarehouse(selectedData.company, selectedData.warehouse)   
      setProducts(response ?? [])
    }

    if (selectedData.warehouse)
      load()
  }, [selectedData.warehouse])

  const handleEnter = async (value) => {
    if (value === "") 
      return

    let response = null

    if (!selectedData.company) {
      showMessage(selectedCompanyEmptyMessage, "warning")
      return
    }

    if (!selectedData.warehouse) {
      response = await searchProductByCompany(selectedData.company, value)
    } else {
      response = await searchProductByCompanyWarehouse(selectedData.company, selectedData.warehouse, value)
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
            stateValue={[selectedData, setSelectedData]}
            label="Empresa"
            options={option.companies}
          />
          <SelectComponent 
            disabled={!selectedData.company}
            fieldName="warehouse"
            stateValue={[selectedData, setSelectedData]}
            label="Almácen"
            options={option.warehouses}
          />
        </Stack>
        <SearchComponent 
          stateValue={[searchValue, setSearchValue]} 
          onEnter={handleEnter}
        />
      </Stack>
      <GridCardLayout>
        { (products.length === 0 && !isSearchingProducts) && 
          <Stack sx={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <SavedSearch sx={{ fontSize: 100 }} color="disabled"/>
            <Typography variant="h6" sx={{ color: "disabled.main", textAlign: "center" }}> 
              Empieza buscando productos 
            </Typography>
          </Stack>
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
          products.map((element, index) => (
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
                        borderRadius: 3
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

export default InventoryPage