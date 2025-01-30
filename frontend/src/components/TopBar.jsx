import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, MessageCircle, ChevronRight, File, LogOut, DollarSign, LogIn, Edit } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { Book } from 'react-bootstrap-icons';

function CustomNavbar() {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // To handle redirection

  useEffect(() => {
    // Check if auth token exists in local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();  // Prevent default navigation
    // Clear the auth token and redirect to login
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    navigate('/login');  // Redirect to login page
  };

  const menuItems = [
    { title: "Home", icon: <Home size={20} />, path: "/" },
    { title: "News", icon: <BookOpen size={20} />, path: "/news" },
    { title: "Case Buddy", icon: <HelpCircle size={20} />, path: "/queries" },
    { title: "Law Comparator", icon: <Book size={20} />, path: "/pdfcompare" },
    { title: "Contract Analysis", icon: <File size={20} />, path: "/riskanalysis" },
    { 
      title: "Legal Cost Estimator", 
      icon: <DollarSign size={20} />, 
      path: "/estimate" 
    },
    { title: "Generate Drafts", icon: <Edit size={20} />, path: "/draft" },
    { title: "Find Lawyers", icon: <File size={20} />, path: "/domains" },
    {
      title: isAuthenticated ? "Logout" : "Login",
      icon: isAuthenticated ? <LogOut size={20} /> : <LogIn size={20} />,
      path: isAuthenticated ? "#" : "/login",
      onClick: isAuthenticated ? handleLogout : undefined,  // Handle logout if authenticated
    },
  ];

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Navbar with Dark Theme */}
      <Navbar bg="dark" variant="dark" expand={false} fixed="top" className="px-3 d-flex justify-content-between">
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Brand className="mx-auto text-white fw-bold">LEGAL AI</Navbar.Brand>
      </Navbar>

      {/* Offcanvas Sliding Menu (Left Side) */}
      <div
        className={`offcanvas offcanvas-start ${show ? "show" : ""}`}
        tabIndex={-1}
        style={{
          backgroundColor: "#1a1a1a",
          borderRight: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div className="offcanvas-header border-bottom border-secondary">
          <h5 className="offcanvas-title text-white mb-0 fs-4 fw-bold">Menu</h5>
          <button type="button" className="btn-close btn-close-white" onClick={handleClose} aria-label="Close menu" />
        </div>

        <div className="offcanvas-body p-0">
          <div className="nav flex-column">
            {menuItems.map((item, index) => (
              <Nav.Link
                key={index}
                as={item.onClick ? 'button' : Link} // Use 'button' for logout action
                to={item.path}
                className="nav-link text-white py-3 px-4 d-flex align-items-center justify-content-between border-bottom border-secondary"
                onClick={item.onClick ? handleLogout : handleClose} // Trigger logout or close
              >
                <div className="d-flex align-items-center gap-3">
                  {item.icon}
                  <span className="fs-5">{item.title}</span>
                </div>
                <ChevronRight size={20} className="text-secondary" />
              </Nav.Link>
            ))}
          </div>
        </div>

        <div className="offcanvas-footer p-4 mt-auto border-top border-secondary">
          <div className="d-flex align-items-center gap-2 text-white-50">
            <div>
              <div className="fw-bold text-white">Legal Assistant</div>
              <small>Version 1.0</small>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {show && <div className="offcanvas-backdrop fade show" onClick={handleClose} />}

      <style>{`
        .offcanvas {
          visibility: visible;
          transform: translateX(${show ? "0" : "-100%"});
          transition: transform 0.3s ease-in-out;
        }

        .nav-link {
          transition: background-color 0.3s ease;
        }

        .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
        }

        .nav-link:active {
          background-color: rgba(255,255,255,0.2);
        }

        .border-bottom {
          transition: border-color 0.3s ease;
        }

        .text-secondary {
          transition: color 0.2s ease;
        }
      `}</style>
    </>
  );
}

export default CustomNavbar;
