import "../css/main.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
// import BrandLogo from "../images/pixbloom.png";
import { useRef } from "react";
// import LogoutUserModal from "./modals/LogoutUserModal";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  const logoutBtnRef = useRef(null);
  const handleLogout = () => {};
  return (
    <>
      <div
        className="d-none d-md-block sidebar-bg position-fixed vh-100 p-3"
        style={{ width: "250px", backgroundColor: "#f0f4f9" }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <NavLink
            className="ps-1 d-flex align-items-center navbar-brand"
            to="/dashboard"
          >
            Taskify
          </NavLink>
          <button
            className="btn p-0 m-0"
            data-bs-toggle="modal"
            data-bs-target="#logoutUserModal"
            ref={logoutBtnRef}
          >
            <i className="fa-solid fa-power-off" onClick={handleLogout}></i>
          </button>
        </div>
        <nav className="navbar-nav flex-column mt-5">
          <NavLink
            className={`nav-link ps-3 ${
              path === "/dashboard" && "nav-link-active"
            }`}
            to="/dashboard"
          >
            <i className="fa-regular fa-image me-2"></i>
            Dashboard
          </NavLink>

          <NavLink
            className={`nav-link ps-3 ${
              path === "/profile" && "nav-link-active"
            }`}
            to="/profile"
          >
            <i className="fa-regular fa-user me-2"></i>
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Offcanvas for small screens */}
      {/* <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: "300px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            PixBloom
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="navbar-nav flex-column">
            <NavLink
              className={`nav-link ps-3 ${
                path === "/photos" && "nav-link-active"
              }`}
              to="/photos"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-regular fa-image me-2"></i>
              Photos
            </NavLink>
            <NavLink
              className={`nav-link ps-3 ${
                path === "/albums" && "nav-link-active"
              }`}
              to="/albums"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-solid fa-book me-2"></i>
              Albums
            </NavLink>
            <NavLink
              className={`nav-link ps-3 ${
                path === "/favourites" && "nav-link-active"
              }`}
              to="/favourites"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-regular fa-star me-1"></i>
              Favourites
            </NavLink>
            <NavLink
              className={`nav-link ps-3 ${
                path === "/profile" && "nav-link-active"
              }`}
              to="/profile"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-regular fa-user me-2"></i>
              Profile
            </NavLink>
          </nav>
        </div>
      </div> */}
      {/* <LogoutUserModal logoutBtnRef={logoutBtnRef} /> */}
    </>
  );
};

export default Sidebar;
