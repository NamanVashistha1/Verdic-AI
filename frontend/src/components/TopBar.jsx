import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function TopBar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top px-3 d-flex justify-content-between">
      <span className="navbar-brand fw-bold">Legal News</span>
      <div className="position-relative">
        <button className="btn btn-dark border-0" onClick={() => setShowMenu(!showMenu)}>
          ⋮
        </button>

        {showMenu && (
          <div className="dropdown-menu dropdown-menu-end show position-absolute end-0 mt-2">
            <Link className="dropdown-item" to="/">Home</Link>
            <Link className="dropdown-item" to="/legal">Legal News</Link>
            <Link className="dropdown-item" to="/chatbot">Chatbot</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
