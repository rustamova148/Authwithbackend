import { useState } from "react";
import styles from "./Setnewpassword.module.css";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import Logo from "../../components/ui/Logo/Logo";

const Setnewpassword = () => {

const [createPassword, setCreatePassword] = useState("");
const [reEnterPassword, setReEnterPassword] = useState("");

  return (
    <div>
      <Logo />
      <form className={styles.form}>
        <div className={styles.setnewpassword_text}>
          <p className={styles.head}>Set a password</p>
          <p className={styles.text}>
            Your previous password has been reseted. Please set a new password for your account.
          </p>
        </div>
        <Inputwithicon
          id="createpassword"
          label="Create Password"
          value={createPassword}
          onChange={(e) => setCreatePassword(e.target.value)}
          required
          type="password"
        />
        <Inputwithicon
          id="reenterpassword"
          label="Re-enter Password"
          value={reEnterPassword}
          onChange={(e) => setReEnterPassword(e.target.value)}
          required
          type="password"
        />
        <Button>Set Password</Button>
      </form>
    </div>
  );
};

export default Setnewpassword;
