import React from "react";
import FeatureSection from "../components/FeatureSection";

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="fw-bold my-5">Welcome to Legal AI</h1>
      <FeatureSection />  {/* ✅ Using the animated section here */}
    </div>
  );
}


