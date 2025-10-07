import { Link } from "react-router-dom"
import styles from "./Navbar.module.scss"

export default function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/cart">Cart</Link>
            <Link to="/products">Products</Link>
        </nav>
    )
}
