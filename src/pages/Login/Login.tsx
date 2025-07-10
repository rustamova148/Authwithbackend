import { useState } from "react";
import styles from "./Login.module.css";
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import Logo from "../../components/ui/Logo/Logo";
import facebook from "../../../src/assets/facebook.png";
import google from "../../../src/assets/google.png";
import apple from "../../../src/assets/apple.png";

const Login = () => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

    return(
        <div>
          <Logo />
          <form className={styles.form}>
          <div>
          <p className={styles.head}>Login</p>
          <p className={styles.text}>Login to access your travelwise account</p>
          </div>
          <Inputsimple 
          id="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          type="email"
          />
          <Inputwithicon
          id="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          type="password" 
          />
          <div className={styles.rememberandforgot}>
            <div className={styles.remember}>
                <input id="remember" type="checkbox" />
                <label htmlFor="remember">Remember me</label>
            </div>
            <span className={styles.forgotpass_text}>Forgot Password</span>
          </div>
          <Button>Login</Button>
          <div className={styles.linktosignup_box}>
            <span className={styles.linktosignup_text}>Don’t have an account? 
                <span className={styles.linktosignup}> Sign up</span></span>
          </div>
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
    )
}

export default Login