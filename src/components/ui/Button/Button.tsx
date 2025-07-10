import type { ReactNode } from "react"
import styles from "./Button.module.css"

type Props = {
    children: ReactNode;
    onClick?: () => void;
}

const Button = ({children, onClick}: Props) => {
    return(
        <button type="submit" onClick={onClick} className={styles.btn}>
            {children}
        </button>
    )
}

export default Button;