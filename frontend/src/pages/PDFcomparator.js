
import React, { useState } from "react"
import axios from "axios"
import { ArrowLeft, Camera, Upload } from "react-bootstrap-icons"
import TopBar from "../components/TopBar"
// import "bootstrap/dist/css/bootstrap.min.css"

const FileUploadAndProcess = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  // const [uploadProgress, setUploadProgress] = useState(20)
  // const [selectedFile, setSelectedFile] = useState(null)
  const [responseMessage, setResponseMessage] = useState("Upload files to start processing...")
  const [loading, setLoading] = useState(false)

  const handleFileChange1 = (e) => { 
    setFile1(e.target.files[0])
    console.log("first file uploaded", file1);
    };
  const handleFileChange2 = (e) => { 
    setFile2(e.target.files[0]);
    console.log("second file uploaded", file2 )

  }
  


  const handleUploadClick = async () => {
        if (!file1 || !file2) {
          alert("Please select both files first.");
          return;
        }
    
        setLoading(true);
        const formData = new FormData();
        formData.append("file1", file1);
        formData.append("file2", file2);
    
        try {
          alert("Uploading and processing files... Please wait.");
          
          // Upload files
          const response  = await axios.post("http://localhost:5000/upload", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });
    
          // const { filePath1, filePath2 } = response.data; // Get file paths from the response
    
          // // Send files for processing
          // const queryResponse = await axios.post("http://localhost:5000/query", {
          //   file1_path: filePath1,
          //   file2_path: filePath2,
          //   lang: "english",
          // });
    
          setResponseMessage(response.data.comparisonResult);
          alert("Processing successful!");
    
        } catch (error) {
          console.error("Error:", error);
          alert("Error processing files.");
        }
    
        setLoading(false);
      };

  return (
    <>
          <TopBar />
    <div className="container-fluid vh-100 d-flex flex-column bg-white p-4" >
      <div className="flex-grow-1 d-flex flex-column">
        <div className="mb-2">
          <h1 className="h3 fw-bold mb-2">Document Comparator</h1>
          <p className="text-muted small">
            Compare your documents here.
          </p>
        </div>

        {/* Upload Area */}
        <div className="mb-4">
        <label className="form-label">Upload First File</label>
          <label
            htmlFor="file-upload"
            className={`d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-success rounded-3 bg-light cursor-pointer ${
              file1 ? "border-success" : "border-dashed"
            }`}
            style={{ minHeight: "85px" }}
          > 
            <input
              id="file-upload"
              type="file"
              className="d-none"
              // accept="image/*"
              onChange={handleFileChange1}
            />
            <Upload className="text-success mb-2" size={24} />
            <span className="text-success small">{file1 ? file1.name : "Upload First File"}</span>
          </label>
        </div>
        

        <div className="text-center mb-2">
          <span className="text-muted small">and</span>
        </div>

        <div className="mb-4">
        <label className="form-label">Upload Second File</label>
          <label
            htmlFor="file-upload1"
            className={`d-flex flex-column align-items-center justify-content-center p-4 border border-2 border-success rounded-3 bg-light cursor-pointer ${
              file2 ? "border-success" : "border-dashed"
            }`}
            style={{ minHeight: "85px" }}
          >
            <input
              id="file-upload1"
              type="file"
              className="d-none"
              // accept="image/*"
              onChange={handleFileChange2}
            />
            <Upload className="text-success mb-2" size={24} />
            <span className="text-success small">{file2 ? file2.name : "Upload Second File"}</span>
          </label>
        </div>


        {/* <button className="btn btn-outline-success d-flex align-items-center justify-content-center mb-4">
          <Camera className="me-2" size={20} />
          Open Camera & Take Photo
        </button> */}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <button
          className="btn btn-success w-100 py-2"
          onClick={handleUploadClick}
          disabled={loading || !file2}
        >
          {loading ? "Processing..." : "Upload & Process"}
        </button>
      </div>

      {/* Processing Response */}
      <div className="mt-4">
        <div className="card">
          <div className="card-header text-white" style={{backgroundColor: "rgb(33 37 41)"}}>Processing Response</div>
          <div className="card-body">
            <p>{responseMessage}</p>
          </div>
        </div>
      </div>
    </div>
    </>

  )
}

export default FileUploadAndProcess



// import React, { useState } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";
// import TopBar from "../components/TopBar";

// const FileUploadAndProcess = () => {
//   const [file1, setFile1] = useState(null);
//   const [file2, setFile2] = useState(null);
//   const [responseMessage, setResponseMessage] = useState("Upload files to start processing...");
//   const [loading, setLoading] = useState(false);

//   const handleFileChange1 = (e) => setFile1(e.target.files[0]);
//   const handleFileChange2 = (e) => setFile2(e.target.files[0]);

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
//       const uploadResponse = await axios.post("http://localhost:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       const { filePath1, filePath2 } = uploadResponse.data; // Get file paths from the response

//       // Send files for processing
//       const queryResponse = await axios.post("http://localhost:5000/query", {
//         file1_path: filePath1,
//         file2_path: filePath2,
//         lang: "english",
//       });

//       setResponseMessage(queryResponse.data.response);
//       alert("Processing successful!");

//     } catch (error) {
//       console.error("Error:", error);
//       alert("Error processing files.");
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="container mt-4">
//       <TopBar />
//       <h2 className="text-center">Upload Two Files for Processing</h2>

//       <div className="row">
//         <div className="col-md-6">
//           <label className="form-label">Upload First File</label>
//           <input type="file" className="form-control" onChange={handleFileChange1} />
//           {file1 && <p className="text-success mt-2">File 1: {file1.name}</p>}
//         </div>

//         <div className="col-md-6">
//           <label className="form-label">Upload Second File</label>
//           <input type="file" className="form-control" onChange={handleFileChange2} />
//           {file2 && <p className="text-success mt-2">File 2: {file2.name}</p>}
//         </div>
//       </div>

//       <button className="btn btn-primary mt-3" onClick={handleUploadClick} disabled={loading}>
//         {loading ? "Processing..." : "Upload & Process"}
//       </button>

//       <div className="mt-4">
//         <div className="card">
//           <div className="card-header bg-info text-white">Processing Response</div>
//           <div className="card-body">
//             <p>{responseMessage}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FileUploadAndProcess;

// import React, { useRef } from "react";
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas";

// const HtmlToPdf = () => {
//   const pdfRef = useRef();

//   const generatePDF = () => {
//     const input = pdfRef.current;
//     html2canvas(input, { scale: 2 }).then((canvas) => {
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgWidth = 210; // A4 width in mm
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;
//       pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
//       pdf.save("document.pdf");
//     });
//   };

//   return (
//     <div>
//       <div ref={pdfRef} style={{ padding: "20px", backgroundColor: "#fff" }}>
//         <h2>Generated PDF Content</h2>
//         <p>This is a sample HTML content that will be converted to a PDF.</p>
//         <ul>
//           <li>Styled text</li>
//           <li>Lists & tables</li>
//           <li>Images</li>
//         </ul>
//       </div>
      
//       <button onClick={generatePDF} style={{ marginTop: "10px" }}>
//         Generate PDF
//       </button>
//     </div>
//   );
// };

// export default HtmlToPdf;
