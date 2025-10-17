import styles from "./Footer.module.scss"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer>
            <div className={styles.content}>
                <p>Copyright &copy; {currentYear} Rolling Pixels. All rights reserved.</p>
            </div>
        </footer>
    )
}
