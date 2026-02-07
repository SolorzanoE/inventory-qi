const numberToMoney = (value) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",

  }).format(value);

export { numberToMoney }