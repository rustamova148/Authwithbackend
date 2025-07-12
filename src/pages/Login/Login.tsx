import styles from "./Login.module.css";
import { useState } from "react";
import { AxiosError } from "axios";
import { Link } from "react-router-dom"
import loginswiperpic from "../../assets/Loginswipperpic.png"
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import { FacebookIcon, GoogleIcon, AppleIcon } from "../../components/ui/Icons";
import ImageSwiper from "../../components/ui/ImageSwiper/ImageSwiper";
import logo from "../../assets/Logo (2).png";
import type { LoginData } from "../../types/formDataTypes";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import type {ValidationErrorResponseLogin} from "../../types/validationErrorTypes";

const Login = () => {
  const navigate = useNavigate();
  const images = [loginswiperpic, loginswiperpic, loginswiperpic];
  const [ emailError, setEmailError ] = useState("");
  const [ passwordError, setPasswordError ] = useState("");

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
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
   const result = await loginUser(formData);
   alert("Ugurlu login");
   console.log(result);
   navigate("/profile");
   localStorage.setItem("accessToken", result.accessToken);
   localStorage.setItem("refreshToken", result.refreshToken);
   localStorage.setItem("refreshTokenExpiredAt", result.refreshTokenExpiredAt);
  }catch(error: unknown){
   const err = error as AxiosError<ValidationErrorResponseLogin>;
   if(err.response && err.response.status === 400){
    const errors = err.response.data;
    if(errors.Email){
    setEmailError(errors.Email[0]);
    }
    if(errors.Password){
    setPasswordError(errors.Password[0]);
    }
   }else{
    console.error("Basqa bir xeta", err);
   }
  }
  }

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <p className="head">Login</p>
            <p className="text">
              Login to access your travelwise account
            </p>
          </div>
          <div>
          <Inputsimple
            id="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            error={emailError}
          />
          {emailError && <p className={styles.email_error}>{emailError}</p>}
          </div>
          <div>
          <Inputwithicon
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            error={passwordError}
          />
          {passwordError && <p className={styles.password_error}>{passwordError}</p>}
          </div>
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
