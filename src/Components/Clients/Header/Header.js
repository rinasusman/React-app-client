import { ROUTES } from "Routes/Routing";
import { authAction } from "container/auth.slice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
  const { PUBLIC, PRIVATE } = ROUTES;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authAction.setLogout());
    navigate(PUBLIC.LOGIN);
  };
  return (
    <nav
      class="navbar navbar-expand-lg navbar-light "
      style={{ "background-color": "#030b6b" }}
    >
      <div class="container-fluid">
        <a class="navbar-brand pe-5 ms-3">
          <b>
            <span className="text-white">
              UR<span className="text-danger">PULSE</span>
            </span>
          </b>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                onClick={() => {
                  navigate("/");
                }}
                aria-current="page"
              >
                <i className="text-white">Home</i>
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                onClick={() => {
                  navigate(PRIVATE.USER_ROUTE.USER_PROFILE);
                }}
                aria-current="page"
              >
                <i className="text-white">Profile</i>
              </a>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a
                class="nav-link active"
                onClick={handleLogout}
                aria-current="page"
              >
                <i className="text-white">Logout</i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
