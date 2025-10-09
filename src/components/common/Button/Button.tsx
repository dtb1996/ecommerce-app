import clsx from "clsx"
import styles from "./Button.module.scss"

type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    variant?: string
    className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, variant, className }) => {
    return (
        <button
            onClick={onClick}
            className={clsx(styles.button, variant && styles[variant], className)}
        >
            {children}
        </button>
    )
}
