import styles from "./Login.module.css";
import { useState } from "react";
import { Link } from "react-router-dom"
import loginswiperpic from "../../assets/Loginswipperpic.png"
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import { FacebookIcon, GoogleIcon, AppleIcon } from "../../components/ui/Icons";
import ImageSwiper from "../../components/ui/ImageSwiper/ImageSwiper";
import logo from "../../assets/Logo (2).png";

const Login = () => {
  const images = [loginswiperpic, loginswiperpic, loginswiperpic];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form}>
          <div>
            <p className={styles.head}>Login</p>
            <p className={styles.text}>
              Login to access your travelwise account
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
          <Inputwithicon
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
          <div className={styles.rememberandforgot}>
            <div className={styles.remember}>
              <input id="remember" type="checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgotpassword" className={styles.forgot_link}>
            <span className={styles.forgotpass_text}>
              Forgot Password
            </span>
            </Link>
          </div>
          <Button>Login</Button>
          <div className={styles.linktosignup_box}>
            <span className={styles.linktosignup_text}>
              Don’t have an account?
              <Link to="/signup" className={styles.signup_link}>
              <span className={styles.linktosignup}> 
                Sign up
              </span>
              </Link>
            </span>
          </div>
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
      <div className={styles.swiper_container}>
        <ImageSwiper images={images} />
      </div>
    </div>
  );
};

export default Login;
