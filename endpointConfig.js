const domainLocal = "http://localhost:5173/"

const entryPoint = "api/"

const developmentEnviroment = {
  dev: domainLocal
}

const endpoint = { 
  API_ENDPOINT_COMPANY_GET: "inventario/empresas",
  API_ENDPOINT_WAREHOUSES_GET: "inventario/almacenes/?",
  API_ENDPOINT_EXISTENCE_BY_COMPANY_WAREHOUSES_GET: "inventario/existencias/?/almacen/?",
  API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_GET: "inventario/buscar-producto/?",
  API_ENDPOINT_EXISTENCE_BY_COMPANY_GET: "inventario/existencias/?",
  API_ENDPOINT_SEARCH_PRODUCT_BY_COMPANY_WAREHOUSES_GET: "inventario/buscar-por-almacen/?/?",
  API_ENDPOINT_REPORT_COMPARATION_GET: "inventario/reporte-comparacion/?"
}

const endpointConfig = (endpointName, enviroment) => (
  developmentEnviroment[enviroment] + entryPoint + endpoint[endpointName]
)

export default endpointConfig