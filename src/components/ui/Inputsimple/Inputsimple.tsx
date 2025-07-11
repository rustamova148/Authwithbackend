import styles from "./Inputsimple.module.css";
import type { InputSimpleProps } from "../../../types/propsTypes";

const Inputsimple = ({
    id,
    label,
    type = "email",
    value,
    onChange,
    name,
    error
}:InputSimpleProps) => {
    return(
        <div className={styles.inputGroup}>
          <input 
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder=" " 
          className={error ? `${styles.input} ${styles.inputError}` 
          : styles.input}
          />
          <label htmlFor={id} className={error ? `${styles.label} ${styles.labelError}` 
          : styles.label}>
            {label}
          </label>
        </div>
    )
}

export default Inputsimple;