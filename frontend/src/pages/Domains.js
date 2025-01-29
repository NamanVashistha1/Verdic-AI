import React from "react"
import { Container, ListGroup, Row, Col } from "react-bootstrap"
import { ArrowRight } from "lucide-react"
import TopBar from "../components/TopBar"
import "../styles/Domains.css";

const legalDomains = [
  { id: 1, name: "Real Estate", icon: "🏠" },
  { id: 2, name: "Construction", icon: "🏗️" },
  { id: 3, name: "Corporate", icon: "🏢" },
  { id: 4, name: "Public Administration", icon: "🏛️" },
  { id: 5, name: "Healthcare", icon: "🏥" },
  { id: 6, name: "Insurance", icon: "🛡️" },
]

const LegalDomains = () => {
  return (
    <>
      <TopBar />
      <Container fluid className="legal-domains-container py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>
            <h2 className="text-center mb-4 display-4 fw-large">
            Your Legal Matters, Handled by Experts in Every Domain
            </h2>
            <ListGroup className="domain-list">
              {legalDomains.map((domain) => (
                <ListGroup.Item
                  key={domain.id}
                  action
                  href="#"
                  className="domain-item py-3 d-flex align-items-center justify-content-between"
                >
                  <span>
                    <span className="domain-icon me-3">{domain.icon}</span>
                    <span className="domain-name">{domain.name}</span>
                  </span>
                  <ArrowRight className="arrow-icon" size={24} />
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default LegalDomains

