export const fetchOffline = async ({ key, fetcher }) => {
  try {
    if (navigator.onLine) {
      const data = await fetcher()
      localStorage.setItem(key, JSON.stringify(data))
      return { data, fromCache: false }
    } else {
      const cached = localStorage.getItem(key)
      if (cached) {
        return { data: JSON.parse(cached), fromCache: true }
      } else {
        return { data: null, fromCache: false, error: "No hay conexión ni datos cacheados." }
      }
    }
  } catch (error) {
    const cached = localStorage.getItem(key)
    if (cached) {
      return { data: JSON.parse(cached), fromCache: true, error: error.message }
    }
    return { data: null, fromCache: false, error: error.message }
  }
}
