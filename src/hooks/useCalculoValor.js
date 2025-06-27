import { useEffect, useState } from "react"
import fetchDolar from "../services/fetchDolar"

const useCalculoValor = () => {
  const [dolarOficial, setDolarOficial] = useState(null)
  const [dolarActual, setDolarActual] = useState(null)
  const [modoPersonalizado, setModoPersonalizado] = useState(false)
  const [valorInput, setValorInput] = useState("")

useEffect(() => {
  const fetchData = async () => {
    const valorPersonalizado = localStorage.getItem("dolarPersonalizado")
    const dolarGuardado = localStorage.getItem("dolar")

    if (valorPersonalizado && dolarGuardado) {
      try {
        const { data, error } = await fetchDolar()
        if (data) {
          setDolarOficial(data.venta)
          setDolarActual(Number(dolarGuardado))
          setValorInput(dolarGuardado)
          setModoPersonalizado(true)
        } else {
          console.error("Error al obtener el dólar:", error)
        }
      } catch (error) {
        console.error("Error al obtener el dólar:", error)
      }
    } else {
      try {
        const { data, error } = await fetchDolar()
        if (data) {
          setDolarOficial(data.venta)
          setDolarActual(data.venta)
          localStorage.setItem("dolar", data.venta)
        } else {
          console.error("Error al obtener el dólar:", error)
        }
      } catch (error) {
        console.error("Error al obtener el dólar:", error)
      }
    }
  }
  fetchData()
}, [])

  const manejarCambio = () => {
    if (!modoPersonalizado && valorInput) {
      const nuevoValor = Number(valorInput)
      setDolarActual(nuevoValor)
      localStorage.setItem("dolar", nuevoValor)
      localStorage.setItem("dolarPersonalizado", "true")
      setModoPersonalizado(true)
    } else {
      setDolarActual(dolarOficial)
      localStorage.setItem("dolar", dolarOficial)
      localStorage.removeItem("dolarPersonalizado")
      setValorInput("")
      setModoPersonalizado(false)
    }
  }

  return {
    dolarOficial,
    dolarActual,
    modoPersonalizado,
    valorInput,
    setValorInput,
    manejarCambio
  }
}

export default useCalculoValor