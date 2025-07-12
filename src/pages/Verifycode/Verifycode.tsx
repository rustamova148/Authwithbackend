import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Verifycode.module.css";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import verifycodepic from "../../assets/Verifycodepic.png";
import { ArrowIcon } from "../../components/ui/Icons";
import { verifyOtpCode } from "../../services/authService";
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';

const Verifycode = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    email: ""
  });

  useEffect(() => {
  const storedemail = localStorage.getItem("email_for_reset");
  if(storedemail){
    setFormData(prev => ({
      ...prev,
      email: storedemail
    }))
  }
  },[])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]:value
  }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try{
  await verifyOtpCode(formData);
  toast.success("Kod tesdiqlendi");
  navigate("/setnewpassword");
  }catch(error){
  console.error('Xeta bas verdi', error);
  toast.error('Xeta bas verdi');
  }
  }

  return (
    <div className={styles.verifycode_container}>
      <div className={styles.verifycode_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <Link to="/login" className={styles.backto_login}>
          <div>
          <ArrowIcon />
          <p>Back to login</p>
          </div>
          </Link>
          <div className={styles.verify_text}>
            <p className="head">Verify Code</p>
            <p className="text">
              An authentication code has been sent to your email.
            </p>
          </div>
          <Inputwithicon
            id="entercode"
            name="code"
            label="Enter Code"
            value={formData.code}
            onChange={handleChange}
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
