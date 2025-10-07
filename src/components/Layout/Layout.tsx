import { Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import styles from "./Layout.module.scss"

export default function Layout() {
    return (
        <div className={styles.layout}>
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}
