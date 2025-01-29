import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

const features = [
  { title: "AI-Powered Legal Assistance", description: "Get instant legal insights with our AI chatbot." },
  { title: "Document Automation", description: "Generate contracts and legal documents effortlessly." },
  { title: "Case Law Research", description: "Find relevant case laws in seconds." },
  { title: "Secure Cloud Storage", description: "Store and manage your legal files securely online." },
  { title: "Real-Time Consultation", description: "Connect with legal experts instantly." },
];

export default function FeatureSection() {
  return (
    <div className="container mt-5 position-relative feature-section">
      <h2 className="text-center fw-bold mb-4">Explore Our Features</h2>
      <div className="feature-timeline">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`feature-item ${index % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >

            {/* Feature Content */}
            <div className="feature-card p-4 shadow-sm rounded bg-light">
              <h4 className="fw-bold">{feature.title}</h4>
              <p>{feature.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
