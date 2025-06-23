export const fetchMaquinaria = async (token) => {
  try {
    const response = await fetch("https://6855d5991789e182b37c700e.mockapi.io/ws/indicadores_maquinaria", {
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