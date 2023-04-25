import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">
            © 2023 AliBigdeli
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <Link className="text-body-secondary" to="https://github.com/AliBigdeli" target={'_blank'}><i className="bi bi-github footer-icon"></i></Link>
          </li>
          <li className="ms-3">
            <Link className="text-body-secondary" to="https://ir.linkedin.com/in/thealibigdeli" target={'_blank'}><i className="bi bi-linkedin footer-icon"></i></Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
