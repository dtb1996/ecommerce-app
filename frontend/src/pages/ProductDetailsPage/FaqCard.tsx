import { Button } from "@/components/common/Button/Button"
import styles from "./FaqCard.module.scss"
import { IoChevronDownOutline } from "react-icons/io5"
import { useState } from "react"

type Props = {
    question: string
    answer: string
}

export const FaqCard: React.FC<Props> = ({ question, answer }) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)

    const toggleCard = () => {
        setIsExpanded((prev) => !prev)
    }

    return (
        <Button className={styles.card} onClick={toggleCard}>
            <div className={styles.header}>
                <h4 className={styles.question}>{question}</h4>
                <div className={`${styles.chevron} ${isExpanded ? styles.active : ""}`}>
                    <IoChevronDownOutline />
                </div>
            </div>
            {isExpanded && <p className={styles.answer}>{answer}</p>}
        </Button>
    )
}

export default FaqCard
