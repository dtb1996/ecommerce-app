import { Link, Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import styles from "./Layout.module.scss"

export default function Layout() {
    return (
        <div className={styles.layout}>
            <div className={styles.topBar}>
                Sign up and get 20% off your first order. <Link to="/login">Sign Up Now</Link>
            </div>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
