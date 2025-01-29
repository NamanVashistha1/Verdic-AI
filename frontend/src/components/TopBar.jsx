import React, { useState } from 'react';
import { Navbar,Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home, BookOpen, HelpCircle, MessageCircle, ChevronRight, Menu, File } from "lucide-react";

function CustomNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const menuItems = [
    { title: "Home", icon: <Home size={20} />, path: "/" },
    { title: "Legal Articles", icon: <BookOpen size={20} />, path: "/news" },
    { title: "Queries", icon: <HelpCircle size={20} />, path: "/queries" },
    { title: "Login", icon: <MessageCircle size={20} />, path: "/login" },
    { title: "Doc Comparator", icon: <File size={20} />, path: "/pdfcompare" },
  ]
  return (
    <>
      {/* Navbar with Dark Theme */}
      <Navbar bg="dark" variant="dark" expand={false} fixed="top" className="px-3 d-flex justify-content-between">
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
        <Navbar.Brand className="mx-auto text-white fw-bold" >LEGAL AI</Navbar.Brand>
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
              as= {Link}
                key={index}
                to={item.path}
                className="nav-link text-white py-3 px-4 d-flex align-items-center justify-content-between border-bottom border-secondary"
                onClick={handleClose}
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
