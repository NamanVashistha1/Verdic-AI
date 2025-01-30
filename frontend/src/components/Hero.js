import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import "../styles/Hero.css";
import "animate.css"; 
import "bootstrap/dist/css/bootstrap.min.css";

const LegalAIHero = () => {
  return (
    <section className="hero-section mb-1 mt-3 bg-gradient-primary text-white position-relative" style={{
      backgroundImage: `url('https://png.pngtree.com/thumb_back/fh260/background/20241030/pngtree-wooden-gavel-on-judge-s-desk-legal-justice-surface-law-and-image_16472274.jpg')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "20px", // Curved edges
    overflow: "hidden",
    opacity: "0.9"
    }}>
      <Container fluid className="px-4 py-3">
        <Row className="align-items-center justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6} className="text-center"  >
            <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInUp">
              Ask VerdicAI
            </h1>
            <p className="mb-4 animate__animated animate__fadeInUp animate__delay-1s" >
              Get instant, accurate legal advice powered by advanced AI. Your personal legal assistant is just a click
              away.
            </p>
            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3 animate__animated animate__fadeInUp animate__delay-2s">
            <Link to="/queries">
              <Button
                variant="outline-light"
                size="md"
                className="custom-button px-3 py-2 fw-semibold d-inline-flex align-items-center border-white"
                style={{ color: "white", borderWidth: "2px", borderColor: "white" }}
              >
                Get Started
                <ArrowRight className="ms-2" size={20} />
              </Button>
            </Link>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Background Decoration */}
      <div className="hero-background position-absolute top-0 start-0 w-100 h-100"></div>
    </section>
  );
};

export default LegalAIHero;
