import { getUserInfo } from "../../services/authService";
import { useState, useEffect } from "react";
import type { UserInfo } from "../../types/userInfoTypes";

const Profile = () => {
const [user, setUser] = useState<UserInfo | null>(null);

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
    return(
     <div>
        Xoş gəldiniz {user?.fullname}!
     </div>
    )
}

export default Profile