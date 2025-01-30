import React, { useState, useRef } from "react"
import axios from "axios"
import { Upload } from "react-bootstrap-icons"
import TopBar from "../components/TopBar"

const RiskAnalysis = () => {
  const [file1, setFile1] = useState(null);
  const [responseMessage, setResponseMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // Ref to scroll to response
  const responseRef = useRef(null);

  const handleFileChange1 = (e) => {
    setFile1(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!file1) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file1", file1);

    try {
      // alert("Uploading and processing file... Please wait.");

      // Upload file
      const response = await axios.post("http://localhost:8080/analyzecontract", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponseMessage(response.data.analyzedResponse);
      // alert("Processing successful!");

      // Scroll to the response section
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);

    } catch (error) {
      console.error("Error:", error);
      alert("Error processing file.");
    }

    setLoading(false);
  };

  return (
    <>
      <TopBar />
      <div className="container-fluid vh-100 d-flex flex-column bg-white p-4">
        <div className="d-flex flex-column">
          <div className="mb-2">
            <h1 className="h3 fw-bold mb-2">Analyze Contracts</h1>
            <p className="text-muted small">
              Get quick analysis of your contracts for high-risk clauses and any relevant suggestions.
            </p>
          </div>

          {/* Upload Area */}
          <div className="mb-4">
            <label className="form-label">Upload Contract</label>
            <label
              htmlFor="file-upload"
              className={`d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-success rounded-3 bg-light cursor-pointer ${file1 ? "border-success" : "border-dashed"
                }`}
              style={{ minHeight: "85px" }}
            >
              <input
                id="file-upload"
                type="file"
                className="d-none"
                onChange={handleFileChange1}
              />
              <Upload className="text-success mb-2" size={24} />
              <span className="text-success small">{file1 ? file1.name : "Upload Contract"}</span>
            </label>

            <div className="mt-3">
              <button
                className="btn btn-success w-100 py-2"
                onClick={handleUploadClick}
                disabled={loading}
              >
                {loading ?    <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                  : "Upload & Process"}
              </button>
            </div>
          </div>
        </div>

        {/* Processing Response Window (Only displayed after upload) */}
        {responseMessage && (
          <div className="mt-4" ref={responseRef}>
            <div className="card">
              <div className="card-header text-white" style={{ backgroundColor: "rgb(33 37 41)" }}>
                 Response
              </div>
              <div className="card-body">
                <p
                  dangerouslySetInnerHTML={{
                    __html: responseMessage
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold titles
                      .replace(/^\*\s(.*?)/gm, "• $1") // Convert '*' to bullet points
                      .replace(/\n/g, "<br />") // Preserve line breaks
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default RiskAnalysis;

