import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"
import { FaMagnifyingGlass } from "react-icons/fa6"
import { LuShoppingCart } from "react-icons/lu"
import { FaRegUserCircle } from "react-icons/fa"

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.companyName}>
                RP.SHOP
            </Link>
            <div className={styles.linksLeft}>
                <Link to="/login">Login</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/products">Products</Link>
            </div>
            <div className={styles.searchContainer}>
                <FaMagnifyingGlass className={styles.icon} />
                <input type="text" placeholder="Search for products..." />
            </div>
            <div className={styles.linksRight}>
                <Link to="/cart">
                    <LuShoppingCart />
                </Link>
                <Link to="/login">
                    <FaRegUserCircle />
                </Link>
            </div>
        </div>
    )
}
