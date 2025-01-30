import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";  // Import axios

const NewsComponent = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/news") // Ensure correct API endpoint
      .then((response) => {
        setNews(response.data);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
      });
  }, []);

  return (
    <Container>
      <Row>
        {news.map((article, index) => (
          <Col key={index} md={4}>
            <Card className="mb-4" style={{backgroundColor: "rgb(33 37 41 / 9%)"}}>
              <Card.Img variant="top" src={article.urlToImage || "https://via.placeholder.com/150"} />
              <Card.Body>
                <Card.Title>{article.title}</Card.Title>
                <Card.Text>{article.description}</Card.Text>
                <Card.Footer>
                  <small className="text-muted">{new Date(article.publishedAt).toDateString()}</small>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default NewsComponent;
