import React, { useState, useRef } from "react";
import axios from "axios";
import { Upload } from "react-bootstrap-icons";
import TopBar from "../components/TopBar";

const FileUploadAndProcess = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const responseRef = useRef(null);

  const handleFileChange1 = (e) => setFile1(e.target.files[0]);
  const handleFileChange2 = (e) => setFile2(e.target.files[0]);

  const handleUploadClick = async () => {
    if (!file1 || !file2) {
      alert("Please select both files first.");
      return;
    }

    setLoading(true);
    setResponseMessage(""); // Clear previous responses
    const formData = new FormData();
    formData.append("file1", file1);
    formData.append("file2", file2);

    try {
      // alert("Uploading and processing files... Please wait.");

      const response = await axios.post("http://localhost:8080/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponseMessage(response.data.comparisonResult);
      // alert("Processing successful!");

      // Focus to response section after receiving results
      setTimeout(() => responseRef.current?.scrollIntoView({ behavior: "smooth" }), 300);
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing files.");
    }

    setLoading(false);
  };

  return (
    <>
      <TopBar />
      <div className="container-fluid vh-100 d-flex flex-column bg-white p-4">
        <div className="flex-grow-1 d-flex flex-column">
          <div className="mb-2">
            <h1 className="h3 fw-bold mb-2">Document Comparator</h1>
            <p className="text-muted small">Compare your documents here.</p>
          </div>

          {/* Upload Areas */}
          {[{ label: "First", file: file1, handler: handleFileChange1 }, { label: "Second", file: file2, handler: handleFileChange2 }]
            .map(({ label, file, handler }, index) => (
              <div key={index} className="mb-4">
                <label className="form-label">Upload {label} File</label>
                <label
                  className={`d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-success rounded-3 bg-light cursor-pointer ${file ? "border-success" : "border-dashed"}`}
                  style={{ minHeight: "85px" }}
                >
                  <input type="file" className="d-none" onChange={handler} />
                  <Upload className="text-success mb-2" size={24} />
                  <span className="text-success small">{file ? file.name : `Upload ${label} File`}</span>
                </label>
              </div>
            ))}

          {/* Upload Button */}
          <div className="mt-2">
            <button
              className="btn btn-success w-100 py-2 d-flex align-items-center justify-content-center"
              onClick={handleUploadClick}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                "Upload & Process"
              )}
            </button>
          </div>

          {/* Processing Response */}
          {responseMessage && (
            <div ref={responseRef} className="mt-4">
              <div className="card">
                <div className="card-header text-white" style={{ backgroundColor: "rgb(33 37 41)" }}>
                  Processing Response
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
      </div>
    </>
  );
};

export default FileUploadAndProcess;


// import React, { useState } from "react"
// import axios from "axios"
// import { ArrowLeft, Camera, Upload } from "react-bootstrap-icons"
// import TopBar from "../components/TopBar"
// // import "bootstrap/dist/css/bootstrap.min.css"

// const FileUploadAndProcess = () => {
//   const [file1, setFile1] = useState(null);
//   const [file2, setFile2] = useState(null);
//   // const [uploadProgress, setUploadProgress] = useState(20)
//   // const [selectedFile, setSelectedFile] = useState(null)
//   const [responseMessage, setResponseMessage] = useState("Upload files to start processing...")
//   const [loading, setLoading] = useState(false)

//   const handleFileChange1 = (e) => {
//     setFile1(e.target.files[0])
//     console.log("first file uploaded", file1);
//   };
//   const handleFileChange2 = (e) => {
//     setFile2(e.target.files[0]);
//     console.log("second file uploaded", file2)

//   }



//   const handleUploadClick = async () => {
//     if (!file1 || !file2) {
//       alert("Please select both files first.");
//       return;
//     }

//     setLoading(true);
//     const formData = new FormData();
//     formData.append("file1", file1);
//     formData.append("file2", file2);

//     try {
//       alert("Uploading and processing files... Please wait.");

//       // Upload files
//       const response = await axios.post("http://localhost:8080/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       // const { filePath1, filePath2 } = response.data; // Get file paths from the response

//       // // Send files for processing
//       // const queryResponse = await axios.post("http://localhost:5000/query", {
//       //   file1_path: filePath1,
//       //   file2_path: filePath2,
//       //   lang: "english",
//       // });

//       setResponseMessage(response.data.comparisonResult);
//       alert("Processing successful!");

//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error processing files.");
//     }

//     setLoading(false);
//   };

//   return (
//     <>
//       <TopBar />
//       <div className="container-fluid vh-100 d-flex flex-column bg-white p-4" >
//         <div className="flex-grow-1 d-flex flex-column">
//           <div className="mb-2">
//             <h1 className="h3 fw-bold mb-2">Document Comparator</h1>
//             <p className="text-muted small">
//               Compare your documents here.
//             </p>
//           </div>

//           {/* Upload Area */}
//           <div className="mb-4">
//             <label className="form-label">Upload First File</label>
//             <label
//               htmlFor="file-upload"
//               className={`d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-success rounded-3 bg-light cursor-pointer ${file1 ? "border-success" : "border-dashed"
//                 }`}
//               style={{ minHeight: "85px" }}
//             >
//               <input
//                 id="file-upload"
//                 type="file"
//                 className="d-none"
//                 // accept="image/*"
//                 onChange={handleFileChange1}
//               />
//               <Upload className="text-success mb-2" size={24} />
//               <span className="text-success small">{file1 ? file1.name : "Upload First File"}</span>
//             </label>
//           </div>


//           <div className="text-center mb-2">
//             <span className="text-muted small">and</span>
//           </div>

//           <div className="mb-4">
//             <label className="form-label">Upload Second File</label>
//             <label
//               htmlFor="file-upload1"
//               className={`d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-success rounded-3 bg-light cursor-pointer ${file2 ? "border-success" : "border-dashed"
//                 }`}
//               style={{ minHeight: "85px" }}
//             >
//               <input
//                 id="file-upload1"
//                 type="file"
//                 className="d-none"
//                 // accept="image/*"
//                 onChange={handleFileChange2}
//               />
//               <Upload className="text-success mb-2" size={24} />
//               <span className="text-success small">{file2 ? file2.name : "Upload Second File"}</span>
//             </label>
//           </div>


//           {/* <button className="btn btn-outline-success d-flex align-items-center justify-content-center mb-4">
//           <Camera className="me-2" size={20} />
//           Open Camera & Take Photo
//         </button> */}
//         </div>

//         {/* Footer */}
//         <div className="mt-auto">
//           <button
//             className="btn btn-success w-100 py-2"
//             onClick={handleUploadClick}
//             disabled={loading || !file2}
//           >
//             {loading ? "Processing..." : "Upload & Process"}
//           </button>
//         </div>

//         {/* Processing Response */}
//         <div className="mt-4">
//           <div className="card">
//             <div className="card-header text-white" style={{ backgroundColor: "rgb(33 37 41)" }}>Processing Response</div>
//             <div className="card-body">
//               <p
//                 // style={{ textAlign: "center" }}
//                 dangerouslySetInnerHTML={{
//                   __html: responseMessage
//                     .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Bold titles
//                     .replace(/^\*\s(.*?)/gm, "• $1") // Convert '*' to bullet points
//                     .replace(/\n/g, "<br />") // Preserve line breaks
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>

//   )
// }

// export default FileUploadAndProcess