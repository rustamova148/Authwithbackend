import { useState, useEffect } from "react";
import styles from "./Setnewpassword.module.css";
import Inputwithicon from "../../components/ui/Inputwithicon/Inputwithicon";
import Button from "../../components/ui/Button/Button";
import logo from "../../assets/Logo (2).png";
import setnewpasswordpic from "../../assets/Setnewpasswordpic.png";
import { resetPassword } from "../../services/authService";
import { useNavigate } from "react-router-dom";

const Setnewpassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: ""
  })
  
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
   await resetPassword(formData);
   alert("Parolunuz ugurla yenilendi");
   navigate("/login");
  }catch(error){
   console.error("Xeta bas verdi", error);
  }
  }

  return (
    <div className={styles.setnewpassword_container}>
      <div className={styles.setnewpassword_form_container}>
        <img src={logo} width={170} className={styles.logo} alt="Logo" />
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.setnewpassword_text}>
            <p className="head">Set a password</p>
            <p className="text">
              Your previous password has been reseted. Please set a new password
              for your account.
            </p>
          </div>
          <Inputwithicon
            id="createpassword"
            name= "newPassword"
            label="Create Password"
            value={formData.newPassword}
            onChange={handleChange}
            required
            type="password"
          />
          <Inputwithicon
            id="reenterpassword"
            name="confirmNewPassword"
            label="Re-enter Password"
            value={formData.confirmNewPassword}
            onChange={handleChange}
            required
            type="password"
          />
          <Button>Set Password</Button>
        </form>
      </div>
      <div className={styles.image_container}>
      <img src={setnewpasswordpic} width={450} height={550} alt="setnewpasswordpic" />
      </div>
    </div>
  );
};

export default Setnewpassword;
