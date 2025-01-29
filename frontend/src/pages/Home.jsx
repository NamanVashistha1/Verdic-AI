import React from "react";
import FeatureSection from "../components/FeatureSection";
import TopBar from "../components/TopBar";

export default function Home() {
  return (
    <>
       <TopBar />
      <div className="text-center">
        <h1 className="fw-bold my-5">Welcome to Legal AI</h1>
        <FeatureSection />  {/* ✅ Using the animated section here */}
      </div>
    </>
  );
}
