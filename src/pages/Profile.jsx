import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfoAsync } from "../features/slice/todoSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { userInfo, status, error } = useSelector((state) => state.todos);

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
                {userInfo.name}
              </p>
              <p>
                <strong>Email: </strong>
                {userInfo.email}
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
