import { useState, useEffect } from 'react'
import type { UserInfo } from "../../types/userInfoTypes"
import { getUserInfo } from "../../services/authService"
import styles from "./Navbar.module.css"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
const [user, setUser] = useState<UserInfo | null>(null);
const navigate = useNavigate(); 

useEffect(() => {
const fetchUser = async () => {
    try{
      const response = await getUserInfo();
      setUser(response);
    }catch(error){
      console.error("İstifadəçi məlumatları alınmadı", error);
    }
}
fetchUser();
},[])

const splitted = user?.fullname.split(/(?=[A-Z])/);
const joined = splitted?.join(" ");
console.log(joined);

const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
}
    return(
        <div className={styles.navbar}>
            <div className={styles.user_profile}>
              <i className={`fa-solid fa-circle-user ${styles.user}`}></i>
              <span>{joined}</span>
              <button onClick={handleLogout}
              className={styles.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Navbar;