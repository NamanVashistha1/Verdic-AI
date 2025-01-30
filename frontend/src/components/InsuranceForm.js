import React, { useState } from "react";
import { jsPDF } from "jspdf";

function Insuranceform() {
  // Insurance claim notice template
  const insuranceClaim = {
    id: 1,
    name: "Insurance Claim Notice",
    formFields: [
      { id: "date", label: "Date", type: "date" },
      { id: "to", label: "To", type: "text", placeholder: "Insurance Company Name" },
      { id: "toAddress", label: "Address", type: "textarea", rows: 3 },
      { id: "dear", label: "Dear", type: "text", placeholder: "Recipient's Name" },
      { id: "typeOfLoss", label: "Type of loss or claim", type: "text" },
      { id: "dateTimeIncurred", label: "Date and time incurred", type: "datetime-local" },
      { id: "location", label: "Location", type: "text" },
      { id: "estimatedLoss", label: "Estimated loss", type: "number", placeholder: "Amount in INR" },
      { id: "homePhone", label: "Home Phone", type: "tel" },
      { id: "workPhone", label: "Work Phone", type: "tel" },
      { id: "policyNumber", label: "Policy Number", type: "text" }
    ]
  };

  const [formData, setFormData] = useState({});

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form Data:', formData);
    
    // Generate PDF after form submission
    generatePDF(formData);
  };
  const generatePDF = (data) => {
    const doc = new jsPDF();
    
    const marginLeft = 20; // Left margin padding
    const marginRight = 20; // Right margin padding
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - marginLeft - marginRight; // Calculate content width
  
    doc.setFontSize(18);
    doc.text("INSURANCE CLAIM NOTICE", marginLeft, 20); // Title
    
    doc.setFontSize(12);
    let yOffset = 30; // Starting Y position for the content
    
    // Date field
    doc.text(`Date: ${data.date || '_______________'}`, marginLeft, yOffset);
    yOffset += 10;
  
    // To (Insurance Company Name and Address)
    doc.text(`To: ${data.to || '_______________'}`, marginLeft, yOffset);
    yOffset += 6;
    doc.text(`${data.toAddress || '_______________'}`, marginLeft, yOffset);
    yOffset += 6;
    doc.text(`${data.toAddress || '_______________'}`, marginLeft, yOffset); // Assuming address has 3 lines
    
    yOffset += 12;
    
    // Dear [Recipient's Name]
    doc.text(`Dear ${data.dear || '_______________'},`, marginLeft, yOffset);
    yOffset += 10;
    
    // Loss details
    doc.text("You are hereby notified that I have incurred a loss which I believe is covered by my insurance policy detailed below. Details of the loss are as follows:", marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 10;
    doc.text(`1. Type of loss or claim: ${data.typeOfLoss || '_______________'}`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 6;
    doc.text(`2. Date and time incurred: ${data.dateTimeIncurred || '_______________'}`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 6;
    doc.text(`3. Location: ${data.location || '_______________'}`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 6;
    doc.text(`4. Estimated loss: ${data.estimatedLoss || '_______________'}`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 10;
    
    // Claim form request
    doc.text("Please forward a claim form to me as soon as possible.", marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 12;
    
    // Closing
    doc.text("Yours sincerely,", marginLeft, yOffset);
    yOffset += 10;
    
    // Right-aligned Home Phone, Work Phone, Policy Number
    const rightX = pageWidth - marginRight;
    doc.text(`Home Phone: ${data.homePhone || '_______________'}`, rightX, yOffset, { align: 'right' });
    yOffset += 6;
    doc.text(`Work Phone: ${data.workPhone || '_______________'}`, rightX, yOffset, { align: 'right' });
    yOffset += 6;
    doc.text(`Policy Number: ${data.policyNumber || '_______________'}`, rightX, yOffset, { align: 'right' });
    
    // Save PDF
    doc.save('insurance_claim_notice.pdf');
  };
  
  

  return (
    <>
      <div className="card">
        <div className="card-body">
          {/* <h3 className="card-title mb-4">{insuranceClaim.name}</h3> */}
          <form onSubmit={handleSubmit}>
            {insuranceClaim.formFields.map((field) => (
              <div key={field.id} className="mb-3">
                <label htmlFor={field.id} className="form-label">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    className="form-control"
                    id={field.id}
                    rows={field.rows}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    type={field.type}
                    className="form-control"
                    id={field.id}
                    value={formData[field.id] || ''}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                Generate Insurance Claim Notice
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Insuranceform;
