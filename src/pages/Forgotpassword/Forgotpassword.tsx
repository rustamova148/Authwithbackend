import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Forgotpassword.module.css";
import Inputsimple from "../../components/ui/Inputsimple/Inputsimple";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import forgotpasswordpic from "../../assets/Forgotpasswordpic.png";
import { AppleIcon, ArrowIcon, FacebookIcon, GoogleIcon } from "../../components/ui/Icons";
import { sendOtpCode } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Forgotpassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ""
  });

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
  await sendOtpCode(formData);
  alert("Emaili yoxla");
  navigate("/verifycode");
  localStorage.setItem("email_for_reset", formData.email);
  }catch(error){
  console.error('Xeta bas verdi', error);
  }
  }

  return (
    <div className={styles.forgotpassword_container}>
      <div className={styles.forgotpassword_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <Link to="/login" className={styles.backto_login}>
          <div>
          <ArrowIcon />
          <p>Back to login</p>
          </div>
          </Link>
          <div>
            <p className="head">Forgot your password?</p>
            <p className="text">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
          </div>
          <Inputsimple
            id="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            type="email"
            name="email"
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
