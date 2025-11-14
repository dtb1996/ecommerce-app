import { Button } from "../common/Button/Button"
import styles from "./Footer.module.scss"
import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <div className={styles.footer}>
            <section className={styles.topSection}>
                <div className={styles.brandColumn}>
                    <h2 className={styles.logo}>SHOP.CO</h2>
                    <p className={styles.description}>
                        We have clothes that suit your style and which you’re proud to wear. From
                        women to men.
                    </p>
                    <div className={styles.socials}>
                        <a href="#">
                            <FaTwitter />
                        </a>
                        <a href="#">
                            <FaFacebookF />
                        </a>
                        <a href="#">
                            <FaInstagram />
                        </a>
                        <a href="#">
                            <FaGithub />
                        </a>
                    </div>
                </div>

                <div className={styles.linkColumns}>
                    <div>
                        <h4>Company</h4>
                        <ul>
                            <li>
                                <a href="#">About</a>
                            </li>
                            <li>
                                <a href="#">Features</a>
                            </li>
                            <li>
                                <a href="#">Works</a>
                            </li>
                            <li>
                                <a href="#">Career</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Help</h4>
                        <ul>
                            <li>
                                <a href="#">Customer Support</a>
                            </li>
                            <li>
                                <a href="#">Delivery Details</a>
                            </li>
                            <li>
                                <a href="#">Terms & Conditions</a>
                            </li>
                            <li>
                                <a href="#">Privacy Policy</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>FAQ</h4>
                        <ul>
                            <li>
                                <a href="#">Account</a>
                            </li>
                            <li>
                                <a href="#">Manage Deliveries</a>
                            </li>
                            <li>
                                <a href="#">Orders</a>
                            </li>
                            <li>
                                <a href="#">Payments</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4>Resources</h4>
                        <ul>
                            <li>
                                <a href="#">Free eBooks</a>
                            </li>
                            <li>
                                <a href="#">Development Tutorial</a>
                            </li>
                            <li>
                                <a href="#">How to – Blog</a>
                            </li>
                            <li>
                                <a href="#">YouTube Playlist</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={styles.bottomSection}>
                <p>Copyright &copy; {currentYear} Rolling Pixels. All rights reserved.</p>
                <p className={styles.attribution}>
                    Design inspired by{" "}
                    <a
                        href="https://www.figma.com/community/file/1273571982885059508/e-commerce-website-template-freebie"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        E-commerce Website Template Freebie
                    </a>{" "}
                    by{" "}
                    <a
                        href="https://www.figma.com/@utsavchauhan"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Utsav Chauhan
                    </a>
                    , licensed under{" "}
                    <a
                        href="https://creativecommons.org/licenses/by/4.0/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        CC&nbsp;BY&nbsp;4.0
                    </a>
                    . Modified for portfolio use.
                </p>
            </section>
        </div>
    )
}
