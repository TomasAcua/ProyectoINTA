import { useEffect, useState } from "react"
import { Download } from "lucide-react"
import Button from "../Button/Button"

function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [showInstallButton, setShowInstallButton] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setShowInstallButton(true)
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      console.log("Usuario aceptó la instalación")
    } else {
      console.log("Usuario canceló la instalación")
    }
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  if (!showInstallButton) return null

  return (
    <div className="sticky bottom-4 left-0 z-50 flex justify-center w-full pointer-events-none">
      <div className="pointer-events-auto">
        <Button
          onClick={handleInstallClick}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300"
        >
          <Download size={20} />
          Instalar App
        </Button>
      </div>
    </div>
  )
}

export default InstallButton
