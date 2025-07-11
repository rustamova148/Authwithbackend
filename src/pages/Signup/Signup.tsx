import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Signup.module.css";
import Button from "../../components/ui/Button/Button";
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import logo from "../../assets/Logo (2).png";
import ImageSwiper from "../../components/ui/ImageSwiper/ImageSwiper";
import signupswiperpic from "../../assets/Signupswiperpic.png";
import { AppleIcon, FacebookIcon, GoogleIcon } from "../../components/ui/Icons";
import type { RegisterData } from "../../types/formDataTypes";
import { registerUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const images = [signupswiperpic, signupswiperpic, signupswiperpic];
  const [formData, setFormData] = useState<RegisterData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try{
   const result = await registerUser(formData);
   console.log("Qeydiyyat ugurlu oldu", result);
   navigate("/login");
  }catch(error){
   console.error("Xeta bas verdi", error);
  }
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <p className={styles.head}>Sign up</p>
            <p className={styles.text}>
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>
          <div className={styles.inputs}>
            <Inputsimple
              id="firstname"
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              type="text"
            />
            <Inputsimple
              id="lastname"
              name="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={handleChange}
              required
              type="text"
            />
          </div>
          <div className={styles.inputs}>
            <Inputsimple
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
            />
            <Inputsimple
              id="number"
              name="phoneNumber"
              label="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              type="tel"
            />
          </div>
          <Inputwithicon
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
          />
          <Inputwithicon
            id="confirmpassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            type="password"
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
              <Link to="/login" className={styles.login_link}>
              <span className={styles.linktologin}> Login</span>
              </Link>
            </span>
          </div>
          <div className={styles.recs}>
            <div className={styles.rectangle}></div>
            <span>Or Sign up with</span>
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

export default Signup;
