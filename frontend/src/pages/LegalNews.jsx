import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsArticle from "../components/NewsArticle"; // Import the news component

export default function LegalNews() {
  return (
    <div>
      <h2 className="text-center my-3">Latest Legal News</h2>
      <NewsArticle /> 
    </div>
  );
}
