//https://dolarapi.com/docs/argentina
// Tipo puede ser "oficial", "blue", "bolsa", "ccl" , "tarjeta", "mayorista" o "crypto"
// {"compra": 0,"venta": 0,"casa": "string","nombre": "string","moneda": "string","fechaActualizacion": "string"}

import {fetchOffline} from "../utils/fetchOffline"


export const fetchDolar = async (type = "oficial") => {
  const key = `${type}`
  return await fetchOffline({
    key,
    fetcher: async () => {
      const res = await fetch(`https://dolarapi.com/v1/dolares/${type}`)
      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`)
      return await res.json()
    }
  })
}

export default fetchDolar