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
import { AxiosError } from "axios";
import type {ValidationErrorResponseRegister} from "../../types/validationErrorTypes"
import { toast } from 'react-toastify';
import { ClipLoader } from "react-spinners";

const Signup = () => {
  const navigate = useNavigate();
  const images = [signupswiperpic, signupswiperpic, signupswiperpic];
  const [ firstNameError, setFirstNameError ] = useState("");
  const [ lastNameError, setLastNameError ] = useState("");
  const [ emailError, setEmailError ] = useState("");
  const [ passwordError, setPasswordError ] = useState("");
  const [ phoneNumberError, setPhoneNumberError ] = useState("");
  const [loading, setLoading] = useState(false);  

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
  setLoading(true);
  try{
   const result = await registerUser(formData);
   console.log("Qeydiyyat ugurlu oldu", result);
   navigate("/login");
  }catch(error: unknown){
   const err = error as AxiosError<ValidationErrorResponseRegister>;
   if(err.response && err.response.status === 400){
    const errors = err.response.data;
    if(errors.FirstName){
    setFirstNameError(errors.FirstName[0]);
    }
    if(errors.LastName){
    setLastNameError(errors.LastName[0]);
    }
    if(errors.Email){
    setEmailError(errors.Email[0]);
    }
    if(errors.PhoneNumber){
    setPhoneNumberError(errors.PhoneNumber[0]);
    }
    if(errors.Password){
    setPasswordError(errors.Password[0]);
    }
   }else{
    console.error("Basqa bir xeta", err);
    toast.error('Xeta');
   }
  }finally{
    setLoading(false);
  }
  }

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div>
            <p className="head">Sign up</p>
            <p className="text">
              Let’s get you all st up so you can access your personal account.
            </p>
          </div>
          <div className={styles.inputs}>
            <div>
            <Inputsimple
              id="firstname"
              name="firstName"
              label="First name"
              value={formData.firstName}
              onChange={handleChange}
              required
              type="text"
              error={firstNameError}
            />
            {firstNameError && <p className={styles.firstname_error}>{firstNameError}</p>}
            </div>
            <div className={styles.lastname_inp_cont}>
            <Inputsimple
              id="lastname"
              name="lastName"
              label="Last name"
              value={formData.lastName}
              onChange={handleChange}
              type="text"
              error={lastNameError}
            />
            {lastNameError && <p className={styles.lastname_error}>{lastNameError}</p>}
            </div>
          </div>
          <div className={styles.inputs}>
            <div>
            <Inputsimple
              id="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
              error={emailError}
            />
            {emailError && <p className={styles.email_error}>{emailError}</p>}
            </div>
            <div>
            <Inputsimple
              id="number"
              name="phoneNumber"
              label="Phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              type="tel"
              error={phoneNumberError}
            />
            {phoneNumberError && <p className={styles.phone_number_error}>{phoneNumberError}</p>}
            </div>
          </div>
          <Inputwithicon
            id="password"
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            type="password"
            error={passwordError}
          />
          {passwordError && <p className={styles.password_error}>{passwordError}</p>}
          <Inputwithicon
            id="confirmpassword"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            type="password"
            error={passwordError}
          />
          {passwordError && <p className={styles.confirm_password_error}>{passwordError}</p>}
          <div className={styles.agree}>
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">
              I agree to all the <span className={styles.agree_red}>Terms</span>{" "}
              and
              <span className={styles.agree_red}>Privacy Policies</span>
            </label>
          </div>
          <Button>{loading ? <ClipLoader size={20} color="#ffffff" /> : 'Create Account'}</Button>
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
          <div className={styles.signupwithother}>
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
