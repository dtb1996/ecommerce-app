import { useEffect, useState } from "react"

export function useResponsiveProducts() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [productsPerPage, setProductsPerPage] = useState<number>(window.innerWidth < 768 ? 6 : 9)

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            setProductsPerPage(mobile ? 6 : 9)
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    return { isMobile, productsPerPage }
}
