import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../../services/authService";
import type { UserDetailInfo } from "../../types/userInfoTypes";
import type { Role } from "../../types/userInfoTypes";
import styles from "./Userdetail.module.css";

const Userdetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserDetailInfo | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (id) {
          const response = await getUser(id);
          setUser(response);
        }
      } catch (error) {
        console.error("Xeta bas verdi", error);
      }
    };
    fetchUser();
  }, [id]);

  return (
    <div className={styles.user_card}>
      <h2>
        {user?.firstName} {user?.lastName}
      </h2>
      <p>
        <strong>Email:</strong> {user?.email}
      </p>
      <p>
        <strong>Phone:</strong> {user?.phoneNumber}
      </p>
      <p>
        <strong>Roles:</strong> {" "}
        {user?.roles.length ? user.roles.map((role: Role) => role.name).join(", ") : "Yoxdur"}
      </p>
      {user?.createdAt && (
      <p>
        <strong>Created At:</strong>{" "}
        {new Date(user.createdAt).toLocaleDateString()}
      </p>
      )}
    </div>
  );
};

export default Userdetail;
