import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu"
import { FaRegUserCircle } from "react-icons/fa"
import { useCart } from "@/context/CartContext"
import { useEffect, useState } from "react"
import { FiMenu, FiX } from "react-icons/fi"

export default function Navbar() {
    const { totalItems } = useCart()
    const [mobileUiState, setMobileUiState] = useState<"none" | "menu" | "search">("none")

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && mobileUiState !== "none") {
                setMobileUiState("none")
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [mobileUiState])

    return (
        <>
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
                    <input type="text" placeholder="Search for products..." />
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

            <div
                className={`${styles.backdrop} ${mobileUiState !== "none" ? styles.show : ""}`}
                onClick={() => setMobileUiState("none")}
            ></div>
        </>
    )
}
