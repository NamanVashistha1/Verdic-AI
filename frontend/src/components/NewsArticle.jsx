import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";

// Sample JSON data for news
const newsData = [
  {
    title: "Supreme Court Revises Data Privacy Laws",
    date: "January 29, 2025",
    source: "Reuters",
    imageUrl: "data:image/jpeg;base64,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",
    content:
      "The Supreme Court of India has revised its ruling on data privacy, ensuring stronger protections for citizens against corporate misuse of personal data.",
  },
  {
    title: "Openai faces copyright lawsuit from indian publishers",
    date: "January 28, 2025",
    source: "LiveLaw",
    imageUrl: "https://img.etimg.com/thumb/width-1600,height-900,imgsize-29150,resizemode-75,msid-117528286/tech/artificial-intelligence/openai-faces-new-copyright-case-from-global-publishers-in-india.jpg",
    "content": "OpenAI has requested an Indian court to dismiss a lawsuit by a group of Indian and global book publishers accusing it of copyright violations. The publishers argue that OpenAI's service, ChatGPT, generates book summaries and extracts from unlicensed copies, harming their business."
  },
];

export default function NewsArticle() {
  return (
    <div className="container-fluid">
      {newsData.map((news, index) => (
        <Card className="border-0 shadow-sm p-3 mb-4" key={index} style={{background:"#e2e1e3"}}>
          {news.imageUrl && (
            <Card.Img variant="top" src={news.imageUrl} alt={news.title} className="img-fluid" />
          )}
          <Card.Body className="px-3">
            <div className="text-muted mb-2 small">{news.source}</div>
            <Card.Title className="h5 fw-bold mb-3">{news.title}</Card.Title>
            <Card.Text className="text" style={{color:"rgb(68 74 80)!important"}}>{news.content}</Card.Text>
            <div className="text-muted small mb-2">{news.date}</div>
            
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
