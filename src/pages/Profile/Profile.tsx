import Navbar from "../../components/Navbar/Navbar"
import styles from "./Profile.module.css"
import { getUsers } from "../../services/authService"
import { useEffect, useState } from "react"
import type { UserInfo } from "../../types/userInfoTypes"

const Profile = () => { 
const [ allUsers, setAllUsers ] = useState<UserInfo[]>([]);
const [totalCount, setTotalCount] = useState(0);
const [search, setSearch] = useState('');
const [pageSize] = useState(7);
const [pageNumber, setPageNumber] = useState(1);

useEffect(() => {
  setPageNumber(1);
}, [search]);


useEffect(() => {
const fetchUsers = async () => {
  try{
  const response = await getUsers(
    { SearchPhrase: search,
      PageSize: pageSize,
      PageNumber: pageNumber,
    }
  );
  const userspart = response.users;
  setAllUsers(userspart);
  setTotalCount(response.totalCount);
  }catch(error){
   console.error(error);
  }
}
fetchUsers();

},[search, pageSize, pageNumber]) 

console.log(allUsers);

    return(
     <div>
      <Navbar />
      <input
        type="text"
        placeholder="Axtar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className = {styles.search}
      />
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={styles.th}>Full name</th>
            <th className={styles.th}>Email</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(u => (
            <tr key={u.id} className={styles.tbodyTrHover}>
             <td className={styles.td}>{u.fullname}</td>
             <td className={styles.td}>{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.pagination_control}>
        <button
          onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          <i className="fa-solid fa-angles-left"></i>
        </button>
        <p>{pageNumber}</p>
        <button
          onClick={() =>
            setPageNumber(prev =>
              prev < Math.ceil(totalCount / pageSize) ? prev + 1 : prev
            )
          }
          disabled={pageNumber >= Math.ceil(totalCount / pageSize)}
        >
          <i className="fa-solid fa-angles-right"></i>
        </button>
      </div>
     </div>
    )
}

export default Profile