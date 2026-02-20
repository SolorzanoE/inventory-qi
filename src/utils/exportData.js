import ExcelJS from 'exceljs';
import { downloadFile } from '@src/utils/downloadFile';

// header = [{ header, key }]
const exportToExcel = async (data, columns, workSheetName = "Datos", customSheet = (sheet) => {}) => {
  const workbook = new ExcelJS.Workbook()
  const sheet = workbook.addWorksheet(workSheetName)

  sheet.columns = columns 

  sheet.addRows(data)

  customSheet(sheet)

  sheet.columns.forEach((column) => {
    let maxLength = 0

    column.eachCell((cell) => {
      const cellValue = cell.value ? cell.value.toString() : ""
      maxLength = Math.max(maxLength, cellValue.length)
    })

    column.width = maxLength + 2
  })

  const buffer = await workbook.xlsx.writeBuffer()

  downloadFile(`Reporte ${new Date().toDateString()}.xlsx`, buffer, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}

export { exportToExcel }