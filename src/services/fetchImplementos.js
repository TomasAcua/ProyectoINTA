export const fetchImplementos = async (token) => {
  try {
    const response = await fetch("https://6858859a138a18086dfb2642.mockapi.io/ws/implementos_maquinaria", {
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