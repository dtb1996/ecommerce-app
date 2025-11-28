import { Button } from "@/components/common/Button/Button"
import styles from "./CustomerReviews.module.scss"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"
import { ReviewCarousel } from "./ReviewCarousel"
import { useEffect, useRef, useState } from "react"
import { companyReviews } from "@/utils/demoReviews"
import carouselStyles from "./ReviewCarousel.module.scss"

export const CustomerReviews: React.FC = () => {
    const trackRef = useRef<HTMLDivElement>(null)

    const [atStart, setAtStart] = useState(true)
    const [atEnd, setAtEnd] = useState(false)

    const updateScrollState = () => {
        const track = trackRef.current
        if (!track) return

        const { scrollLeft, scrollWidth, clientWidth } = track

        setAtStart(scrollLeft <= 0)
        setAtEnd(scrollLeft + clientWidth >= scrollWidth - 1)
    }

    const scrollAmount = () => {
        const track = trackRef.current
        if (!track) return 0
        const firstItem = track.querySelector<HTMLElement>(`.${carouselStyles.item}`)
        return firstItem?.offsetWidth ?? 0
    }

    const scrollNext = () => {
        const track = trackRef.current
        if (!track) return
        track.scrollLeft += scrollAmount()
        updateScrollState()
    }

    const scrollPrev = () => {
        const track = trackRef.current
        if (!track) return
        track.scrollLeft -= scrollAmount()
        updateScrollState()
    }

    useEffect(() => {
        updateScrollState()

        const track = trackRef.current
        if (!track) return

        track.addEventListener("scroll", updateScrollState)
        return () => track.removeEventListener("scroll", updateScrollState)
    }, [])

    return (
        <div className={styles.customerReviews}>
            <div className={styles.heading}>
                <h2>Our Happy Customers</h2>
                <div className={styles.scroll}>
                    <Button onClick={scrollPrev} disabled={atStart}>
                        <FaArrowLeft />
                    </Button>
                    <Button onClick={scrollNext} disabled={atEnd}>
                        <FaArrowRight />
                    </Button>
                </div>
            </div>
            <ReviewCarousel ref={trackRef} reviews={companyReviews} />
        </div>
    )
}

export default CustomerReviews
