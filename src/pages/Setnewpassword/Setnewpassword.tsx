import { useState } from "react";
import styles from "./Setnewpassword.module.css";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import setnewpasswordpic from "../../assets/Setnewpasswordpic.png";

const Setnewpassword = () => {
  const [createPassword, setCreatePassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");

  return (
    <div className={styles.setnewpassword_container}>
      <div className={styles.setnewpassword_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form}>
          <div className={styles.setnewpassword_text}>
            <p className={styles.head}>Set a password</p>
            <p className={styles.text}>
              Your previous password has been reseted. Please set a new password
              for your account.
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
      <div className={styles.image_container}>
      <img src={setnewpasswordpic} width={450} height={550} alt="forgotpasswordpic" />
      </div>
    </div>
  );
};

export default Setnewpassword;
