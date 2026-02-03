import ExcelJS from 'exceljs';

// header = [{ header, key }]
const exportToExcel = async (data, header) => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet("Datos")

  sheet.columns = header
  sheet.addRows(data)

  // Generar el archivo en memoria
  const buffer = await workbook.xlsx.writeBuffer()
    
  // Crear un Blob y disparar la descarga
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = window.URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `Reporte ${new Date().toDateString()}.xlsx`
  anchor.click()
  window.URL.revokeObjectURL(url)
}


export { exportToExcel }