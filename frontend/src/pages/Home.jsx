import React, { useState } from "react"; // Make sure useState is imported
import FeatureSection from "../components/FeatureSection";
import TopBar from "../components/TopBar";
import TestimonialCarousel from "../components/Testimonial";
import { motion } from "framer-motion";
import { Button} from 'react-bootstrap';
import LegalAIHero from '../components/Hero';

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const [message, setMessage] = useState('');  // State hook to manage the message

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle message submission
    console.log('Message submitted:', message);
    setMessage('');
  };

  return (
    <>
      <TopBar />
      <LegalAIHero/>
      <div className="text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="row justify-content-center"
        >
          {/* About Us */}
          <motion.div variants={itemVariants} className="col-lg-10 text-center mt-2">
            <h1 className="display-4 fw-bold mb-1">About Us</h1>
            <p className="mb-0 text-muted" style={{fontSize:"16px"}}>
            At VerdicAI, we transform how legal professionals handle documents, regulations, and case research. Our AI-powered platform streamlines workflows for accuracy, efficiency, and compliance.
            </p>
          </motion.div>
        </motion.div>
        {/* Background decoration */}
        <div className="position-absolute top-0 start-0 w-100 h-20 overflow-hidden" style={{ zIndex: -1 }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,0 C30,50 70,50 100,0 L100,100 0,100 Z"
              fill="#f8f9fa"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <FeatureSection /> {/* ✅ Using the animated section here */}
        <TestimonialCarousel />
      </div>
    </>
  );
}
