import React from "react";
import "./../utils/Style/common.scss";

const HeaderComponent = (props) => {
  return <div className="header_comp poppins-bold">{props.title}</div>;
};

export default HeaderComponent;
