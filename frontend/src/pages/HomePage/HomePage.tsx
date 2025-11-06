import BrandStrip from "./BrandStrip/BrandStrip"
import HeroSection from "./HeroSection/HeroSection"
import styles from "./HomePage.module.scss"

export default function HomePage() {
    return (
        <div>
            <HeroSection />
            <BrandStrip />
        </div>
    )
}
