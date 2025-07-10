import { useState } from "react";
import styles from "./Signup.module.css";
import Button from "../../components/ui/Button/Button";
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import logo from "../../assets/Logo (2).png";
import facebook from "../../../src/assets/facebook.png";
import google from "../../../src/assets/google.png";
import apple from "../../../src/assets/apple.png";
import ImageSwiper from "../../components/ui/ImageSwiper/ImageSwiper";
import signupswiperpic from "../../assets/Signupswiperpic.png";

const Signup = () => {
  const images = [signupswiperpic, signupswiperpic, signupswiperpic];
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form}>
          <div>
            <p className={styles.head}>Sign up</p>
            <p className={styles.text}>
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>
          <div className={styles.inputs}>
            <Inputsimple
              id="firstname"
              label="First name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              type="firstname"
            />
            <Inputsimple
              id="lastname"
              label="Last name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              type="lastname"
            />
          </div>
          <div className={styles.inputs}>
            <Inputsimple
              id="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
            />
            <Inputsimple
              id="number"
              label="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="number"
            />
          </div>
          <Inputwithicon
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
          />
          <Inputwithicon
            id="confirmpassword"
            label="Confirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
            type="confirmpassword"
          />
          <div className={styles.agree}>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">
              I agree to all the <span className={styles.agree_red}>Terms</span>{" "}
              and
              <span className={styles.agree_red}>Privacy Policies</span>
            </label>
          </div>
          <Button>Create account</Button>
          <div className={styles.linktologin_box}>
            <span className={styles.linktologin_text}>
              Already have an account?
              <span className={styles.linktologin}> Login</span>
            </span>
          </div>
          <div className={styles.recs}>
            <div className={styles.rectangle}></div>
            <span>Or Sign up with</span>
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
      <div className={styles.swiper_container}>
        <ImageSwiper images={images} />
      </div>
    </div>
  );
};

export default Signup;
