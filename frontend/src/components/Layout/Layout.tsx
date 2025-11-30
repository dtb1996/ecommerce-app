import { Link, Outlet } from "react-router-dom"
import Footer from "../Footer/Footer"
import Navbar from "../Navbar/Navbar"
import styles from "./Layout.module.scss"
import { useEffect, useState } from "react"
import { Button } from "../common/Button/Button"
import { IoClose } from "react-icons/io5"
import { AnimatePresence, motion } from "framer-motion"
import { MdOutlineEmail } from "react-icons/md"

export default function Layout() {
    const [announcementVisible, setAnnouncementVisible] = useState<boolean>(() => {
        const savedVisible = sessionStorage.getItem("announcementVisible")
        return savedVisible ? Boolean(savedVisible) : true
    })

    useEffect(() => {
        sessionStorage.setItem("announcementVisible", announcementVisible.toString())
    }, [announcementVisible])

    return (
        <div className={styles.layout}>
            <div id="banner">
                <AnimatePresence>
                    {announcementVisible && (
                        <motion.div
                            className={styles.announcementBanner}
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <div>
                                Sign up and get 20% off your first order.{" "}
                                <Link to="/login">Sign Up Now</Link>
                            </div>
                            <Button
                                onClick={() => setAnnouncementVisible(false)}
                                aria-label="Close announcement banner"
                            >
                                <IoClose />
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <nav id="navbar" className={styles.navbar}>
                <Navbar />
            </nav>

            <main>
                <div className={styles.contentWrapper}>
                    <Outlet />
                </div>
            </main>

            <div className={`${styles.emailContainer}`}>
                <div className={styles.emailBackground} />
                <div className={styles.emailBanner}>
                    <h2>STAY UP TO DATE ABOUT OUR LATEST OFFERS</h2>
                    <div className={styles.emailInput}>
                        <div className={styles.searchContainer}>
                            <MdOutlineEmail className={styles.icon} />
                            <input
                                id="email input box"
                                type="text"
                                placeholder="Enter your email address"
                            />
                        </div>
                        <Button>Subscribe to Newsletter</Button>
                    </div>
                </div>
            </div>

            <footer>
                <div className={styles.contentWrapper}>
                    <Footer />
                </div>
            </footer>
        </div>
    )
}
