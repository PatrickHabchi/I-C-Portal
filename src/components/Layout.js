import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import LegalNavbar from "./legal-navbar";
import "./../utils/Style/component/sidebar.scss";

function Layout() {
  const [navClick, setNavClick] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
const navigate = useNavigate();
  useEffect(() => {
    const paths = location.pathname.split("/");
    const firstPath = paths[1] || "default";
    setNavClick(firstPath);
  }, [location]);

  const handleDropdownToggle = () => setShowDropdown((prev) => !prev);

  return (
    <div className="container sidebar">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-2 d-none d-lg-block g-0"></div>
        <div className="col-lg-2 d-none d-lg-block g-0 left">
          <div className="Logo">
            <img src="/Images/suyool_logo.png" alt="Logo" />
          </div>
          <div className="scrollSection">
            {/* Render both navbars statically */}
            <LegalNavbar setNavClick={setNavClick} />

            <div className="bottomSide">
              {/* <p>support@suyool.com</p> */}
            </div>
          </div>
        </div>

        <div className="col-lg-10 col-md-12 g-0 right">
          <div className="header">
            <div className="d-flex">

              <div className="company-logo">
                <img src="/Images/I&CLogo.png" />
              </div>

              <div className="company-name">
                I&C Digital Account Dashboard
              </div>

            </div>


            {/* Change merchant menu */}
            <div className="userInfo">
              <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
                <Dropdown.Toggle>
                  <div className="userToggel">
                    <div className="user">
                      <div className="user-profile">
                        <img src="/Images/emptypp.jpg" alt="User" />
                      </div>
                      <p className="userName">{sessionStorage.getItem("Username")}</p>
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div className="legal-list">
                    <button
                      className="logout"
                      style={{ marginBottom: "unset" }}
                      onClick={    ()=>   { sessionStorage.setItem("Token", "");navigate("/")} }
                    >
                           {/* <FontAwesomeIcon icon={faSignOutAlt} /> {"  "} */}
                   <span style={{marginLeft:"10px"}}>  Logout </span> 
                    </button>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
