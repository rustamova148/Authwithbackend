import styles from "./Inputsimple.module.css";
import type { InputSimpleProps } from "../../../types/propsTypes";

const Inputsimple = ({
    id,
    label,
    type = "email",
    value,
    onChange,
    required = false,
    name
}:InputSimpleProps) => {
    return(
        <div className={styles.inputGroup}>
          <input 
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder=" " 
          className={styles.input}
          />
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        </div>
    )
}

export default Inputsimple;