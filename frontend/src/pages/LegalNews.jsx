import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsArticle from "../components/NewsArticle"; // Import the news component
import TopBar from "../components/TopBar";

export default function LegalNews() {
  return (
    <>
        <TopBar />
      <div className="container mt-5 pt-5"> 
      

        <h2 className="text-center my-3">Latest Legal News</h2>
        <NewsArticle />
      </div>
    </>
  );
}
