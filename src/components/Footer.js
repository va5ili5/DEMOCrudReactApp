import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-content">
            &copy; {new Date().getFullYear()}
            <Link to={"/"}> Responsive Pages Manager</Link>
        </div>
    </footer>
  );
};

export default Footer;