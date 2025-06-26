export const fetchOffline = async ({ key, fetcher }) => {
  if (navigator.onLine) {
    try {
      const data = await fetcher()
      localStorage.setItem(key, JSON.stringify(data))
      return { data, fromCache: false }
    } catch (error) {
      const cached = localStorage.getItem(key)
      if (cached) {
        return { data: JSON.parse(cached), fromCache: true, error: error.message }
      }
      return { data: null, fromCache: false, error: error.message }
    }
  } else {
    const cached = localStorage.getItem(key)
    if (cached) {
      return { data: JSON.parse(cached), fromCache: true }
    } else {
      return { data: null, fromCache: false, error: "Sin conexión y sin datos previos" }
    }
  }
}