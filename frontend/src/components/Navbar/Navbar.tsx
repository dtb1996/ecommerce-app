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
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [searchOpen, setSearchOpen] = useState<boolean>(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && menuOpen) {
                setMenuOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [menuOpen])

    return (
        <>
            <div className={styles.navContainer}>
                <button
                    className={`${styles.menuButton} ${menuOpen ? styles.open : ""}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    {menuOpen ? <FiX /> : <FiMenu />}
                </button>

                <Link to="/" className={styles.companyName} onClick={() => setMenuOpen(false)}>
                    RP.SHOP
                </Link>

                <div className={`${styles.linksLeft} ${menuOpen ? styles.show : ""}`}>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                        Login
                    </Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)}>
                        Cart
                    </Link>
                    <Link to="/products" onClick={() => setMenuOpen(false)}>
                        Products
                    </Link>
                </div>

                <div className={styles.searchContainer}>
                    <FaMagnifyingGlass className={styles.icon} />
                    <input type="text" placeholder="Search for products..." />
                </div>

                <div className={styles.linksRight}>
                    <button
                        className={styles.mobileSearch}
                        onClick={() => {
                            setMenuOpen(false)
                            setSearchOpen(!searchOpen)
                        }}
                        aria-label="Toggle search bar"
                    >
                        <FaMagnifyingGlass />
                    </button>
                    <Link to="/cart" className={styles.cartLink} onClick={() => setMenuOpen(false)}>
                        <LuShoppingCart />
                        {totalItems > 0 && <span className={styles.cartCount}>{totalItems}</span>}
                    </Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                        <FaRegUserCircle />
                    </Link>
                </div>
            </div>

            <div
                className={`${styles.backdrop} ${menuOpen ? styles.show : ""}`}
                onClick={() => setMenuOpen(false)}
            ></div>
        </>
    )
}
