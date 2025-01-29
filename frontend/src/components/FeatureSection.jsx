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
      {/* Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: -1 }}>
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M0,0 C30,50 70,50 100,0 L100,100 0,100 Z"
          fill="#f8f9fa"
          opacity="0.5"
        />
      </svg>
    </div>

      <div className="feature-timeline">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`feature-item ${index % 2 === 0 ? "left" : "right"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
          >
            {/* Feature Content */}
            <motion.div
              className="feature-card p-4 shadow-sm rounded bg-light"
              whileHover={{
                scale: 1.05,
                rotate: 3,
                transition: { duration: 0.3 },
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.1 },
              }}
              style={{ marginBottom: "0px" }}
            >
              <h4 className="fw-bold">{feature.title}</h4>
              <p>{feature.description}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
