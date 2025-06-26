import {fetchOffline} from "../utils/fetchOffline"

export const fetchProductos = async (token) => {

  const key = "productos"
  return await fetchOffline({
    key,
    fetcher: async () => {
      const response = await fetch("https://sipan.inta.gob.ar/ws/productos.json.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `token=${encodeURIComponent(token)}`,
      })

      if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`)

      return await response.json()
    }
  })
}