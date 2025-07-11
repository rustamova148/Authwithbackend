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
    required = false,
    name
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
          required={required}
          placeholder=" " 
          className={styles.input}
          />
          <label htmlFor={id} className={styles.label}>
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