import styles from "./Button.module.css"
import type { ButtonProps } from "../../../types/propsTypes"

const Button = ({children, onClick}: ButtonProps) => {
    return(
        <button type="submit" onClick={onClick} className={styles.btn}>
            {children}
        </button>
    )
}

export default Button;