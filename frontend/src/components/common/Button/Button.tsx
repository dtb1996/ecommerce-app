import clsx from "clsx"
import styles from "./Button.module.scss"

type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode
    onClick?: () => void
    disabled?: boolean
    variant?: string
    className?: string
}

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant,
    className,
    ...props
}) => {
    return (
        <button
            onClick={onClick}
            {...props}
            className={clsx(styles.button, variant && styles[variant], className)}
        >
            {children}
        </button>
    )
}
