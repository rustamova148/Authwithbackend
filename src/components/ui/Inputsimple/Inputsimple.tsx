import styles from "./Inputsimple.module.css";

type Props = {
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    name?: string;
}

const Inputsimple = ({
    id,
    label,
    type = "email",
    value,
    onChange,
    required = false,
    name
}:Props) => {
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