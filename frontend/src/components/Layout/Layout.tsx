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
            <nav>
                <div className={styles.contentWrapper}>
                    <Navbar />
                </div>
            </nav>
            <main>
                <div className={styles.contentWrapper}>
                    <Outlet />
                </div>
            </main>
            <footer>
                <div className={styles.contentWrapper}>
                    <Footer />
                </div>
            </footer>
        </div>
    )
}
