import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Verifycode.module.css";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import verifycodepic from "../../assets/Verifycodepic.png";
import { ArrowIcon } from "../../components/ui/Icons";

const Verifycode = () => {
  const [code, setCode] = useState("");

  return (
    <div className={styles.verifycode_container}>
      <div className={styles.verifycode_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form}>
          <Link to="/login" className={styles.backto_login}>
          <div>
          <ArrowIcon />
          <p>Back to login</p>
          </div>
          </Link>
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
      <div className={styles.image_container}>
      <img src={verifycodepic} width={450} height={550} alt="forgotpasswordpic" />
      </div>
    </div>
  );
};

export default Verifycode;
