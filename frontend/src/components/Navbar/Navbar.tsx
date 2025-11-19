import { Link, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.scss"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu"
import { FaRegUserCircle } from "react-icons/fa"
import { useCart } from "@/context/CartContext"
import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"
import { useProducts } from "@/hooks/useProducts"
import type { Product } from "@/types/Product"

export default function Navbar() {
    const { totalItems } = useCart()
    const [mobileUiState, setMobileUiState] = useState<"none" | "menu" | "search">("none")
    const [searchTerm, setSearchTerm] = useState<string>("")
    const [searchResults, setSearchResults] = useState<Product[]>([])
    const [showResults, setShowResults] = useState<boolean>(false)

    const { allProducts } = useProducts()
    const navigate = useNavigate()

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileUiState !== "none") {
                setMobileUiState("none")
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [mobileUiState])

    useEffect(() => {
        if (!searchTerm.trim()) {
            setSearchResults([])
            setShowResults(false)
            return
        }

        const lower = searchTerm.toLowerCase()

        const matches = allProducts.filter(
            (p) =>
                p.name.toLowerCase().includes(lower) ||
                p.description.toLowerCase().includes(lower) ||
                p.category.toLowerCase().includes(lower)
        )

        setSearchResults(matches)
        setShowResults(true)
    }, [searchTerm, allProducts])

    return (
        <div className={styles.navRoot}>
            <div className={styles.navContainer}>
                <button
                    className={`${styles.menuButton} ${mobileUiState === "menu" ? styles.open : ""}`}
                    onClick={() => setMobileUiState((prev) => (prev === "menu" ? "none" : "menu"))}
                    aria-label="Toggle menu"
                >
                    {mobileUiState === "menu" ? <FiX /> : <FiMenu />}
                </button>

                <Link
                    to="/"
                    className={styles.companyName}
                    onClick={() => setMobileUiState("none")}
                >
                    RP.SHOP
                </Link>

                <div
                    className={`${styles.linksLeft} ${mobileUiState === "menu" ? styles.show : ""}`}
                >
                    <Link to="/login" onClick={() => setMobileUiState("none")}>
                        Login
                    </Link>
                    <Link to="/cart" onClick={() => setMobileUiState("none")}>
                        Cart
                    </Link>
                    <Link to="/products" onClick={() => setMobileUiState("none")}>
                        Products
                    </Link>
                </div>

                <div
                    className={`${styles.searchContainer} ${mobileUiState === "search" ? styles.searchActive : ""}`}
                >
                    <FaMagnifyingGlass className={styles.icon} />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm && setShowResults(true)}
                    />
                </div>

                <div className={styles.linksRight}>
                    <button
                        className={styles.mobileSearch}
                        onClick={() =>
                            setMobileUiState((prev) => (prev === "search" ? "none" : "search"))
                        }
                        aria-label="Toggle search bar"
                    >
                        <FaMagnifyingGlass />
                    </button>
                    <Link
                        to="/cart"
                        className={styles.cartLink}
                        onClick={() => setMobileUiState("none")}
                    >
                        <LuShoppingCart />
                        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
                    </Link>
                    <Link to="/login" onClick={() => setMobileUiState("none")}>
                        <FaRegUserCircle />
                    </Link>
                </div>
            </div>

            {showResults && (
                <div className={styles.searchResults}>
                    {searchResults.length === 0 ? (
                        <div className={styles.noResults}>No results found</div>
                    ) : (
                        searchResults.slice(0, 6).map((product) => (
                            <button
                                key={product.id}
                                className={styles.resultItem}
                                onClick={() => {
                                    navigate(`/products/${product.id}`)
                                    setMobileUiState("none")
                                    setShowResults(false)
                                    setSearchTerm("")
                                }}
                            >
                                <img src={product.image_url} alt={product.name} />
                                <span>{product.name}</span>
                            </button>
                        ))
                    )}
                </div>
            )}

            <div
                className={`${styles.backdrop} ${mobileUiState !== "none" ? styles.show : ""}`}
                onClick={() => {
                    setMobileUiState("none")
                    setShowResults(false)
                }}
            ></div>
        </div>
    )
}
