import styles from "./Navbar.module.css"
import { useNavigate } from "react-router-dom"
import type { UserInfo } from "../../types/userInfoTypes"

type Props = {
  user: UserInfo | null;
};

const Navbar = ({user}: Props) => {
const navigate = useNavigate(); 

const splitted = user?.fullname.split(/(?=[A-Z])/);
const joined = splitted?.join(" ");

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