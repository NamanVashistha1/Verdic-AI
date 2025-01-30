import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';  // For dynamic routing based on URL

const DomainPage = () => {
    const { domain } = useParams();  // This captures the "domain" URL parameter
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        fetchLawyers(domain);  // Fetch data based on the domain clicked
    }, [domain]);

    const fetchLawyers = (domain) => {
        const domainData = {
            estate: [
                { name: 'John Doe', specialization: 'Real Estate', phone: '123-456-7890', email: 'john.doe@example.com' },
                { name: 'Jane Smith', specialization: 'Real Estate', phone: '987-654-3210', email: 'jane.smith@example.com' },
                { name: 'Mike Johnson', specialization: 'Real Estate', phone: '555-555-5555', email: 'mike.johnson@example.com' },
                { name: 'Sara Lee', specialization: 'Real Estate', phone: '666-666-6666', email: 'sara.lee@example.com' }
            ],
            construction: [
                { name: 'David Brown', specialization: 'Construction', phone: '111-222-3333', email: 'david.brown@example.com' },
                { name: 'Emily Davis', specialization: 'Construction', phone: '444-555-6666', email: 'emily.davis@example.com' },
                { name: 'Paul Walker', specialization: 'Construction', phone: '777-888-9999', email: 'paul.walker@example.com' },
                { name: 'Nina White', specialization: 'Construction', phone: '000-111-2222', email: 'nina.white@example.com' }
            ],
            corporate: [
                { name: 'Anna Green', specialization: 'Corporate Law', phone: '123-456-7891', email: 'anna.green@example.com' },
                { name: 'Richard Harris', specialization: 'Corporate Law', phone: '987-654-3211', email: 'richard.harris@example.com' },
                { name: 'Sophia Black', specialization: 'Corporate Law', phone: '555-555-5551', email: 'sophia.black@example.com' },
                { name: 'Michael Blue', specialization: 'Corporate Law', phone: '666-666-6661', email: 'michael.blue@example.com' }
            ],
            public_administration: [
                { name: 'Helen White', specialization: 'Public Administration', phone: '111-222-3331', email: 'helen.white@example.com' },
                { name: 'Liam Grey', specialization: 'Public Administration', phone: '444-555-6661', email: 'liam.grey@example.com' },
                { name: 'Olivia Blue', specialization: 'Public Administration', phone: '777-888-9991', email: 'olivia.blue@example.com' },
                { name: 'James Brown', specialization: 'Public Administration', phone: '000-111-2221', email: 'james.brown@example.com' }
            ],
            healthcare: [
                { name: 'Rachel Green', specialization: 'Healthcare Law', phone: '123-456-7892', email: 'rachel.green@example.com' },
                { name: 'Paulina Smith', specialization: 'Healthcare Law', phone: '987-654-3212', email: 'paulina.smith@example.com' },
                { name: 'John White', specialization: 'Healthcare Law', phone: '555-555-5552', email: 'john.white@example.com' },
                { name: 'Emily Harris', specialization: 'Healthcare Law', phone: '666-666-6662', email: 'emily.harris@example.com' }
            ],
            insurance: [
                { name: 'Megan Brown', specialization: 'Insurance Law', phone: '111-222-3332', email: 'megan.brown@example.com' },
                { name: 'Jack Wilson', specialization: 'Insurance Law', phone: '444-555-6662', email: 'jack.wilson@example.com' },
                { name: 'Isabella Taylor', specialization: 'Insurance Law', phone: '777-888-9992', email: 'isabella.taylor@example.com' },
                { name: 'Daniel Green', specialization: 'Insurance Law', phone: '000-111-2222', email: 'daniel.green@example.com' }
            ],
            
        };

        // Fetch data based on domain
        setLawyers(domainData[domain] || []);  // Default to empty array if no domain data found
    };

    return (
        <Container>
            <h2 className="text-center my-4">Lawyers Specializing in {domain.replace('_', ' ').toUpperCase()}</h2>
            {lawyers.length === 0 ? (
                <p>No lawyers found for this domain.</p>
            ) : (
                lawyers.map((lawyer, index) => (
                    <Row key={index} className="mb-3">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{lawyer.name}</Card.Title>
                                    <Card.Text><strong>Specialization:</strong> {lawyer.specialization}</Card.Text>
                                    <Card.Text><strong>Phone:</strong> {lawyer.phone}</Card.Text>
                                    <Card.Text><strong>Email:</strong> {lawyer.email}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))
            )}
        </Container>
    );
};

export default DomainPage;
