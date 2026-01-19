const domainLocal = "http://localhost:5173/"

const entryPoint = "api/"

const developmentEnviroment = {
  dev: domainLocal
}

const endpoint = { 
  API_ENDPOINT_COMPANY_LIST: "inventario/empresas",
  API_ENDPOINT_WAREHOUSES_BY_COMPANY_LIST: "inventario/almacenes/?",
  API_ENDPOINT_PRODUCT_EXISTENCE_BY_COMPANY_WAREHOUSES_LIST: "inventario/existencias/?/almacen/?",
  API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_LIST: "inventario/buscar-producto/?",
  API_ENDPOINT_PRODUCT_EXISTENCE_BY_COMPANY_LIST: "inventario/existencias/?",
  API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_WAREHOUSES_LIST: "inventario/buscar-por-almacen/?/?",
  API_ENDPOINT_REPORT_COMPARATION_LIST: "inventario/reporte-comparacion/?"
}

const endpointConfig = (endpointName, enviroment) => (
  developmentEnviroment[enviroment] + entryPoint + endpoint[endpointName]
)

export default endpointConfig