import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import CardComponent from "@src/components/cards/CardComponent"
import SearchComponent from "@src/components/searches/SearchComponent"
import SelectComponent from "@src/components/selects/SelectComponent"
import { useState } from "react"

const InventoryPage = () => {
  const filterModel = {
    company: "",
    warehouse: ""
  }

  const filterData = useState(filterModel)

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
            isRequired
            fieldName="company"
            stateValue={filterData}
            label="Empresa"
            options={[{ id: 1, nombre: "hola" }]}
          />
          <SelectComponent 
            fieldName="warehouse"
            stateValue={filterData}
            label="Almácen"
            options={[{ id: 1, nombre: "hola" }]}
          />
        </Stack>
        <SearchComponent />
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
              <CardComponent footer={"hola"} title="hola" description="hola" variant="" />
            </Stack>
          </Grid>
        )) }
      </Grid>
    </Stack>
  )
}


export default InventoryPage