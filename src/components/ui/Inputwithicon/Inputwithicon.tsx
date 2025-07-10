import styles from "./Inputwithicon.module.css";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; 

type Props = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    name?: string;
}

const Inputwithicon = ({
    id,
    label,
    value,
    onChange,
    required = false,
    name
}:Props) => {

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