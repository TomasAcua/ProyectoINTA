export function formatUSD2ARS(value, dolar) {
    const usd = parseFloat(value || 0).toFixed(2)
    const ars = (usd * dolar).toFixed(2)
    return `USD $${usd} / ARS ${ars}`
}