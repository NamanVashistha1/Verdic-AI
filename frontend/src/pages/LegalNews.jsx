import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NewsArticle from "../components/NewsArticle"; // Import the news component
import TopBar from "../components/TopBar";

export default function LegalNews() {
  return (
    <>
        <TopBar />
      <div className="container pt-2 mt-1"> 
        {/* <h2 className="text-center my-1">Latest Legal News</h2> */}
        <NewsArticle />
      </div>
    </>
  );
}
