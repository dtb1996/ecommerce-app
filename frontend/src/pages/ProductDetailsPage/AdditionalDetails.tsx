import { Button } from "@/components/common/Button/Button"
import styles from "./AdditionalDetails.module.scss"
import { useState } from "react"
import { ReviewCard } from "@/components/ReviewCard/ReviewCard"
import { productReviews } from "@/utils/demoReviews"
import { productFaqs } from "@/utils/demoFaqs"
import FaqCard from "./FaqCard"
import { LuListFilter } from "react-icons/lu"

export const AdditionalDetails = () => {
    const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faqs">("details")

    return (
        <div className={styles.additionalDetails}>
            <div className={styles.tabs}>
                <Button
                    className={`${styles.tabButton} ${activeTab === "details" ? styles.active : ""}`}
                    onClick={() => setActiveTab("details")}
                >
                    Product Details
                </Button>
                <Button
                    className={`${styles.tabButton} ${activeTab === "reviews" ? styles.active : ""}`}
                    onClick={() => setActiveTab("reviews")}
                >
                    Rating & Reviews
                </Button>
                <Button
                    className={`${styles.tabButton} ${activeTab === "faqs" ? styles.active : ""}`}
                    onClick={() => setActiveTab("faqs")}
                >
                    FAQs
                </Button>
            </div>

            {activeTab === "reviews" && (
                <div className={styles.reviewTab}>
                    <div className={styles.tabHeader}>
                        <h4>All Reviews</h4>
                        <p className={styles.reviewCount}>({productReviews.length})</p>
                        <Button className={styles.filtersButton} onClick={() => {}}>
                            <LuListFilter />
                        </Button>
                        <Button className={styles.latestButton} onClick={() => {}}>
                            Latest
                        </Button>
                        <Button onClick={() => {}}>Write a Review</Button>
                    </div>

                    <div className={styles.reviewsGrid}>
                        {productReviews.slice(0, 6).map((review, i) => (
                            <div key={i} className={styles.item}>
                                <ReviewCard review={review} />
                            </div>
                        ))}
                    </div>

                    <Button className={styles.loadMore} onClick={() => {}}>
                        Load More Reviews
                    </Button>
                </div>
            )}

            {activeTab === "details" && (
                <div className={styles.detailsTab}>
                    <p className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sed turpis
                        ut diam tempor cursus ultrices vel nisi. Nunc euismod ullamcorper elit, et
                        semper tellus vehicula vel. Integer euismod vulputate lobortis. Morbi
                        hendrerit diam ut metus hendrerit facilisis. Donec posuere sodales sem ac
                        vestibulum. Fusce posuere erat a nunc fermentum, nec lobortis dolor
                        malesuada. Maecenas malesuada dolor vel nulla efficitur ornare. Maecenas at
                        tellus ac metus consectetur sagittis. Aenean vehicula felis felis, a
                        vehicula arcu dignissim a. Etiam in justo ipsum. Integer molestie at sem vel
                        sodales.
                        <br />
                        <br />
                        Etiam ex leo, suscipit volutpat pharetra ac, efficitur sed nibh. Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit. Suspendisse pellentesque mattis
                        nulla. Phasellus commodo lorem in vestibulum aliquam. Phasellus eget purus
                        sem. Etiam vitae neque sit amet leo malesuada scelerisque. Sed sed pretium
                        mi, eu euismod sem. Curabitur sed quam commodo, malesuada eros eu, convallis
                        neque. Nulla facilisi.
                        <br />
                        <br />
                        Phasellus sagittis magna vel mollis lobortis. Duis semper iaculis leo sed
                        viverra. Aliquam lobortis augue quam, ac consectetur tortor pharetra ut.
                        Aliquam ultricies hendrerit pellentesque. Vivamus ante augue, porta et
                        libero non, semper porttitor tortor. Sed nisl libero, ornare eget sem at,
                        ultrices cursus libero. Vestibulum vitae justo iaculis, rutrum metus eget,
                        consequat neque. Donec ac est vehicula, placerat odio non, feugiat justo. Ut
                        pulvinar eu mi at accumsan. Ut sodales, mauris ac vestibulum facilisis,
                        justo sapien varius nulla, sit amet ullamcorper felis eros non turpis. Class
                        aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos
                        himenaeos.
                        <br />
                        <br />
                    </p>
                </div>
            )}

            {activeTab === "faqs" && (
                <div className={styles.faqsTab}>
                    <div className={styles.questionsWrapper}>
                        <div className={styles.questions}>
                            {productFaqs.map((faq, i) => (
                                <FaqCard key={i} question={faq.question} answer={faq.answer} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AdditionalDetails
