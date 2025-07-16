import { useSearchParams } from 'react-router-dom';
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.css";
import { getUsers } from "../../services/authService";
import { getUserInfo } from "../../services/authService";
import { getUser } from "../../services/authService";
import { deleteUser } from "../../services/authService";
import { useEffect, useState } from "react";
import type { UserInfo } from "../../types/userInfoTypes";
import type { UserDetailInfo } from "../../types/userInfoTypes";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { editUser } from "../../services/authService";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam) : 1;
  const [pageNumber, setPageNumber] = useState(currentPage);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [allUsers, setAllUsers] = useState<UserInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [pageSize] = useState(7);
  const [actionsId, setActionsId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserDetailInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getUserInfo();
        setUser(response);
      } catch (error) {
        console.error("İstifadəçi məlumatları alınmadı", error);
      }
    };
    fetchUser();
  }, []);

  console.log("Login olan user:", user);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        id: selectedUser.id,
        firstName: selectedUser.firstName,
        lastName: selectedUser.lastName,
        email: selectedUser.email,
        phoneNumber: selectedUser.phoneNumber,
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  useEffect(() => {
  setPageNumber(1);
  setSearchParams({ page: '1' });
  }, [search]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await getUsers({
          SearchPhrase: search,
          PageSize: pageSize,
          PageNumber: pageNumber,
        });
        const userspart = response.users;
        setAllUsers(userspart);
        setTotalCount(response.totalCount);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [search, pageSize, pageNumber]);

  const handleActions = (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    setActionsId((prev) => (prev === id ? null : id));
  };

  const handleEdit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    setShowEditModal(true);
    try {
      const response = await getUser(id);
      setSelectedUser(response);
    } catch (error) {
      console.error("Xeta bas verdi", error);
    }
  };

  console.log(selectedUser);

  const closeShowEditModal = () => {
    setShowEditModal(false);
    setActionsId(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteUser(id);
      setAllUsers((prev) => prev.filter((user) => user.id !== id));
      navigate("/profile");
      toast.success("Istifadeci silindi");
      setActionsId(null);
    } catch (error) {
      console.error("Xeta bas verdi", error);
      toast.error("Xeta bas verdi");
    } finally {
      console.log("Silinəcək user ID:", id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(formData);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editUser(formData);
      const response = await getUsers({
        SearchPhrase: search,
        PageSize: pageSize,
        PageNumber: pageNumber,
      });
      const userspart = response.users;
      setAllUsers(userspart);
      toast.success("Istifadeci ugurla redakte olundu");
      setShowEditModal(false);
      setActionsId(null);
    } catch (error) {
      console.error("Xeta bas verdi", error);
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);
  const pageGroupSize = 4;

  // Hansi blokdayiq (0, 1, 2, ...)
  const currentGroup = Math.floor((pageNumber - 1) / pageGroupSize);

  // Bu blokda baslayan ve biten page nomreleri
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  // Butun page nomrelerini array olaraq topla
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (updater: number | ((prev: number) => number)) => {
    const nextPage = typeof updater === 'function' ? updater(pageNumber) : updater;
    setPageNumber(nextPage);
    setSearchParams({ page: nextPage.toString() }); // URL-də ?page=page dəyərini qoyur
  };

  return (
    <div>
      <Navbar user={user} />
      <input
        type="text"
        placeholder="Axtar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Full name</th>
            <th className={styles.th}>Email</th>
            <th className={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className={styles.clip_tr}>
              <td className={styles.clip_td} colSpan={3}>
                <ClipLoader size={50} color="#4A90E2" />
              </td>
            </tr>
          ) : (
            allUsers
              .filter((au) => au.id != user?.id)
              .map((u) => (
                // profildeki adi filter etmek alinmadi
                <tr
                  key={u.id}
                  onClick={() => navigate(`/users/${u.id}`)}
                  className={styles.tbodyTrHover}
                >
                  <td className={styles.td}>{u.fullname}</td>
                  <td className={styles.td}>{u.email}</td>
                  <td className={`${styles.td} ${styles.td_third}`}>
                    <button
                      onClick={(e) => handleActions(e, u.id)}
                      className={styles.actions_btn}
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    {actionsId === u.id && (
                      <ul className={styles.actions_modal}>
                        <li>
                          <button
                            className={styles.edit_btn}
                            onClick={(e) => handleEdit(e, u.id)}
                          >
                            <i className="fa-solid fa-pen"></i>
                            <span>Edit</span>
                          </button>
                        </li>
                        <li>
                          <button
                            className={styles.delete_btn}
                            onClick={() => handleDelete(u.id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                            <span>Delete</span>
                          </button>
                        </li>
                      </ul>
                    )}
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      {showEditModal && (
        <div className={styles.overlay_edit} onClick={closeShowEditModal}>
          <div className={styles.edit_box} onClick={(e) => e.stopPropagation()}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="fname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="fnumber">Phone Number</label>
              <input
                type="tel"
                id="fnumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <button>Submit</button>
            </form>
          </div>
        </div>
      )}
      <div className={styles.pagination_control}>
        <div>
          <button
            onClick={() => handlePageChange((prev) => Math.max(prev - 1, 1))}
            disabled={pageNumber === 1} className={styles.next_prev_btn}
          >
            <i className="fa-solid fa-angles-left"></i>
          </button>
          {pageNumbers.map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} 
            className={`${page === pageNumber ? styles.activebtn : styles.pag_btn}`}>
              {page}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange((prev) =>
                prev < Math.ceil(totalCount / pageSize) ? prev + 1 : prev
              )
            }
            disabled={pageNumber >= Math.ceil(totalCount / pageSize)}
            className={styles.next_prev_btn}
          >
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
