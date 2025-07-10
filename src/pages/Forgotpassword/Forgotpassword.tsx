import { useState } from "react";
import styles from "./Forgotpassword.module.css";
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import forgotpasswordpic from "../../assets/Forgotpasswordpic.png";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={styles.forgotpassword_container}>
      <div className={styles.forgotpassword_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form}>
          <p>Back to login</p>
          <div>
            <p className={styles.head}>Forgot your password?</p>
            <p className={styles.text}>
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
          </div>
          <Inputsimple
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <Button>Submit</Button>
          <div className={styles.recs}>
            <div className={styles.rectangle}></div>
            <span>Or login with</span>
            <div className={styles.rectangle}></div>
          </div>
          <div className={styles.loginwithother}>
            <div>
              <img src={facebook} alt="facebook" />
            </div>
            <div>
              <img src={google} alt="google" />
            </div>
            <div>
              <img src={apple} alt="apple" />
            </div>
          </div>
        </form>
      </div>
      <div className={styles.image_container}>
      <img src={forgotpasswordpic} width={450} height={550} alt="forgotpasswordpic" />
      </div>
    </div>
  );
};

export default Forgotpassword;
