import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header className="header">
    <div className="header-title">
    <Link to={"/"}><h1>Responsive Pages Manager</h1></Link>
        </div>
      </header>
  );
};

export default Header;