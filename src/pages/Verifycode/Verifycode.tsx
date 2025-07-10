import { useState } from "react";
import styles from "./Verifycode.module.css";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import Logo from "../../components/ui/Logo/Logo";

const Verifycode = () => {
  const [code, setCode] = useState("");

  return (
    <div>
      <Logo />
      <form className={styles.form}>
        <p>Back to login</p>
        <div className={styles.verify_text}>
          <p className={styles.head}>Verify Code</p>
          <p className={styles.text}>
            An authentication code has been sent to your email.
          </p>
        </div>
        <Inputwithicon
          id="entercode"
          label="Enter Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          required
          type="password"
        />
        <div className={styles.linktoresend_box}>
          <span className={styles.linktoresend_text}>
            Didn't receive a code?
            <span className={styles.linktoresend}> Resend</span>
          </span>
        </div>
        <Button>Verify</Button>
      </form>
    </div>
  );
};

export default Verifycode;
