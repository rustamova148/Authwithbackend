import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Forgotpassword.module.css";
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import forgotpasswordpic from "../../assets/Forgotpasswordpic.png";
import { AppleIcon, ArrowIcon, FacebookIcon, GoogleIcon } from "../../components/ui/Icons";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");

  return (
    <div className={styles.forgotpassword_container}>
      <div className={styles.forgotpassword_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form}>
          <Link to="/login" className={styles.backto_login}>
          <div>
          <ArrowIcon />
          <p>Back to login</p>
          </div>
          </Link>
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
              <FacebookIcon />
            </div>
            <div>
              <GoogleIcon />
            </div>
            <div>
              <AppleIcon />
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
