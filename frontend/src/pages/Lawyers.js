import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';  // For dynamic routing based on URL
import TopBar from '../components/TopBar';

const DomainPage = () => {
    const { domain } = useParams();  // This captures the "domain" URL parameter
    const [lawyers, setLawyers] = useState([]);

    useEffect(() => {
        fetchLawyers(domain);  // Fetch data based on the domain clicked
    }, [domain]);

    const fetchLawyers = (domain) => {
        const domainData = {
                "estate": [
                  {
                    "name": "Cyril Shroff",
                    "specialization": "Real Estate",
                    "phone": "+91-22-2496-4455",
                    "email": "cyril.shroff@cyrilshroff.com"
                  },
                  {
                    "name": "Zia Mody",
                    "specialization": "Real Estate",
                    "phone": "+91-22-6636-7000",
                    "email": "zia.mody@azbpartners.com"
                  },
                  {
                    "name": "Shardul Shroff",
                    "specialization": "Real Estate",
                    "phone": "+91-11-4159-0700",
                    "email": "shardul.shroff@amsshardul.com"
                  },
                  {
                    "name": "Haigreve Khaitan",
                    "specialization": "Real Estate",
                    "phone": "+91-22-6636-5000",
                    "email": "haigreve.khaitan@khaitanco.com"
                  }
                ],
                "construction": [
                  {
                    "name": "Rajiv Luthra",
                    "specialization": "Construction",
                    "phone": "+91-11-4121-5100",
                    "email": "rajiv.luthra@luthra.com"
                  },
                  {
                    "name": "Anand Desai",
                    "specialization": "Construction",
                    "phone": "+91-22-6636-7000",
                    "email": "anand.desai@dsklegal.com"
                  },
                  {
                    "name": "Ravi Singhania",
                    "specialization": "Construction",
                    "phone": "+91-11-4747-1414",
                    "email": "ravi.singhania@singhania.in"
                  },
                  {
                    "name": "Berjis Desai",
                    "specialization": "Construction",
                    "phone": "+91-22-6636-7000",
                    "email": "berjis.desai@jonesday.com"
                  }
                ],
                "corporate": [
                  {
                    "name": "Pallavi Shroff",
                    "specialization": "Corporate Law",
                    "phone": "+91-11-4311-5000",
                    "email": "pallavi.shroff@shardulamarchand.com"
                  },
                  {
                    "name": "Rohit Kochhar",
                    "specialization": "Corporate Law",
                    "phone": "+91-11-4111-5222",
                    "email": "rohit.kochhar@kochhar.com"
                  },
                  {
                    "name": "Sujit Ghosh",
                    "specialization": "Corporate Law",
                    "phone": "+91-22-6636-7000",
                    "email": "sujit.ghosh@plurilaw.com"
                  },
                  {
                    "name": "Akil Hirani",
                    "specialization": "Corporate Law",
                    "phone": "+91-22-6636-7000",
                    "email": "akil.hirani@majmudar.com"
                  }
                ],
                "public_administration": [
                  {
                    "name": "Prashant Bhushan",
                    "specialization": "Public Administration",
                    "phone": "+91-11-2656-1000",
                    "email": "prashant.bhushan@bhushanlaw.com"
                  },
                  {
                    "name": "Indira Jaising",
                    "specialization": "Public Administration",
                    "phone": "+91-22-2200-5000",
                    "email": "indira.jaising@lawyerscollective.org"
                  },
                  {
                    "name": "Gopal Subramanium",
                    "specialization": "Public Administration",
                    "phone": "+91-11-2307-5000",
                    "email": "gopal.subramanium@gslegal.in"
                  },
                  {
                    "name": "Harish Salve",
                    "specialization": "Public Administration",
                    "phone": "+91-11-2371-5000",
                    "email": "harish.salve@hsalve.com"
                  }
                ],
                "healthcare": [
                  {
                    "name": "Sujata V. Manohar",
                    "specialization": "Healthcare Law",
                    "phone": "+91-22-2200-5000",
                    "email": "sujata.manohar@lawyerscollective.org"
                  },
                  {
                    "name": "Colin Gonsalves",
                    "specialization": "Healthcare Law",
                    "phone": "+91-22-2282-5000",
                    "email": "colin.gonsalves@hrln.org"
                  },
                  {
                    "name": "Anand Grover",
                    "specialization": "Healthcare Law",
                    "phone": "+91-22-2200-5000",
                    "email": "anand.grover@lawyerscollective.org"
                  },
                  {
                    "name": "Menaka Guruswamy",
                    "specialization": "Healthcare Law",
                    "phone": "+91-11-2656-1000",
                    "email": "menaka.guruswamy@lawchambers.in"
                  }
                ],
                "insurance": [
                    {
                      "name": "Cyrus S. Poonawalla",
                      "specialization": "Insurance Law",
                      "phone": "+91-20-2612-5000",
                      "email": "cyrus.poonawalla@poonawallagroup.com"
                    },
                    {
                      "name": "Rashesh Shah",
                      "specialization": "Insurance Law",
                      "phone": "+91-22-6141-5000",
                      "email": "rashesh.shah@edelweissfin.com"
                    },
                { name: 'Isabella Taylor', specialization: 'Insurance Law', phone: '777-888-9992', email: 'isabella.taylor@example.com' },
                { name: 'Daniel Green', specialization: 'Insurance Law', phone: '000-111-2222', email: 'daniel.green@example.com' }
            ],
            
        };

        // Fetch data based on domain
        setLawyers(domainData[domain] || []);  // Default to empty array if no domain data found
    };

    return (
        <>
        <TopBar />
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
        </>
    );
};

export default DomainPage;
