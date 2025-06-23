export const fetchProductos = async (token, rubro) => {
  try {
    let url = "https://68586502138a18086dfade90.mockapi.io/ws/indicadores_productos";

    if (rubro) {
      url += `?rubro=${encodeURIComponent(rubro)}`;
    }
    const response = await fetch(url, {
      // method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      // body: new URLSearchParams({ token }),
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
};
