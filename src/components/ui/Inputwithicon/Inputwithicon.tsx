import styles from "./Inputwithicon.module.css";
import { useState } from "react";
import Eye from "../../ui/Icons/Eye";
import EyeOff from "../../ui/Icons/EyeOff";
import type { InputWithIconProps } from "../../../types/propsTypes";

const Inputwithicon = ({
    id,
    label,
    value,
    onChange,
    name,
    error
}:InputWithIconProps) => {

    const [showPassword, setShowPassword] = useState(false);

    return(
        <div className={styles.inputGroup}>
          <input 
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
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

          <span
          className={styles.icon}
          onClick={() => setShowPassword(prev => !prev)}
          >
           { showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
    )
}

export default Inputwithicon;