export const fetchMaquinaria = async (token) => {
  try {
    const response = await fetch("https://sipan.inta.gob.ar/ws/maquinaria.json.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `token=${encodeURIComponent(token)}`,
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