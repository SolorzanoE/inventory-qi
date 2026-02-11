const downloadFile = (name, buffer, type) => {
  const blob = new Blob([buffer], {
    type: type
  })

  const url = URL.createObjectURL(blob)

  const link = document.createElement("a")
  link.href = url
  link.download = name
  link.click()

  URL.revokeObjectURL(url)
}

export { downloadFile }