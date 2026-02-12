const domainDevelopment = "http://localhost:5173/"
const domainProduction = "http://192.168.88.245:5000/"

const entryPoint = "api/"

const currentMode = import.meta.env.MODE

const domains = {
  development: domainDevelopment,
  production: domainProduction
}

const endpoints = { 
  API_ENDPOINT_COMPANY_LIST: "inventario/empresas",
  API_ENDPOINT_WAREHOUSE_BY_COMPANY_LIST: "inventario/almacenes/*",
  API_ENDPOINT_PRODUCT_EXISTENCE_BY_COMPANY_WAREHOUSE_LIST: "inventario/existencias/*/almacen/*",
  API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_LIST: "inventario/buscar-producto/*?filtro=*",
  API_ENDPOINT_PRODUCT_EXISTENCE_BY_COMPANY_LIST: "inventario/existencias/*",
  API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_WAREHOUSE_LIST: "inventario/buscar-por-almacen/*/*?filtro=*",

  API_ENDPOINT_REPORT_COMPARATION_POST: "inventario/reporte-comparacion/*?idAlmacen=*"
}

const endpoint = Object.fromEntries(
  Object.entries(endpoints).map(([key, value]) => {
    const endpoint = domains[currentMode] + entryPoint + value
    return [key, endpoint]
  })
)

export default endpoint