import React, { useState } from 'react';
import { Navbar, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function CustomNavbar() {
  const [show, setShow] = useState(false);

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
      <Offcanvas show={show} onHide={handleClose} placement="start" className="custom-offcanvas">
        <Offcanvas.Header className="bg-dark text-white">
          <Offcanvas.Title className="text-white fw-bold">Menu</Offcanvas.Title>
          <button className="btn-close btn-close-white" onClick={handleClose}></button>
        </Offcanvas.Header>
        <Offcanvas.Body className="bg-dark text-white">
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" className="text-white" onClick={handleClose}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/news" className="text-white" onClick={handleClose}>
              Legal Articles
            </Nav.Link>
            <Nav.Link as={Link} to="/chatbot" className="text-white" onClick={handleClose}>
              Chatbot
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default CustomNavbar;
