import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";


function LegalNavbar({ setNavClick }) {
    const [activeLink, setActiveLink] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();




    return (
        <div className="navbar-legal">
            <div className="Title">I&C ACCOUNT MANAGEMENT</div>
            <div>
                <NavLink
                    to="/"
                    className={({ isActive }) => `nav-link ${isActive ? "subTitleClicked" : "subTitle"}`}
                    style={{textDecoration: "none"}}
                >
                    Overview
                </NavLink>
            </div>

            <div>
                <NavLink
                    to="/digitalI&CAccount"
                    className={({ isActive }) => `nav-link ${isActive ? "subTitleClicked" : "subTitle"}`}
                    style={{textDecoration: "none"}}
                >
                    Digital I&C Account (3)
                </NavLink>
            </div>
        
            <hr />
 
        </div>
    );
}

export default LegalNavbar;
