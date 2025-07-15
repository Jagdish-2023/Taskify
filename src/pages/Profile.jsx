import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfoAsync } from "../features/slice/todoSlice";
import { backendUrl } from "../utils/fetchApi";
import axios from "axios";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.todos);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.location.href = "/";
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      dispatch(fetchUserInfoAsync());
    }
  }, []);
  return (
    <>
      <Sidebar />
      <main className="p-3" style={{ marginLeft: "250px" }}>
        {status === "loading" && (
          <div className="text-center m-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <p>{error}</p>}

        {userInfo && (
          <div>
            <h1 className="h5 text-dark-emphasis">My Profile</h1>
            <hr />

            <div className="mt-3">
              <p>
                <strong>Name: </strong>
                {userInfo.fullName}
              </p>
              <p>
                <strong>Email: </strong>
                {userInfo.email}
              </p>
            </div>

            <div>
              <button className="btn btn-sm btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
