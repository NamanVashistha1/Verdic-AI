import React, { useState } from "react";
import TopBar from "../components/TopBar";
import Insuranceform from "../components/InsuranceForm";
import VehicleTransferForm from "../components/VehicleTransfer";

function Draft() {
  // Sample drafts
  const drafts = [
    { id: 1, name: "Insurance-Claim Notice", formComponent: <Insuranceform /> },
    { id: 2, name: "Ownership Tranfer of Motor Vehicle", formComponent: <VehicleTransferForm />},
    { id: 3, name: "Invoice Draft", formFields: ["Invoice Number", "Amount", "Date"] }
  ];

  const [selectedDraft, setSelectedDraft] = useState(null);

  const handleDraftChange = (event) => {
    const draftId = parseInt(event.target.value);
    setSelectedDraft(drafts.find(draft => draft.id === draftId));
  };

  return (
    <>
      <TopBar />
      <div className="container mt-4 card-body">
        <h1>Draft Generator</h1>

        <div className="mb-4">
          <label htmlFor="draft-select" className="form-label">Select Draft Type:</label>
          <select
            id="draft-select"
            className="form-select"
            onChange={handleDraftChange}
          >
            <option value="">Select a draft</option>
            {drafts.map((draft) => (
              <option key={draft.id} value={draft.id}>
                {draft.name}
              </option>
            ))}
          </select>
        </div>

        {selectedDraft && (
          <div>
            <h3>{selectedDraft.name}</h3>
            {selectedDraft.formComponent || (
              <form>
                {selectedDraft.formFields.map((field, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={field.toLowerCase()} className="form-label">{field}</label>
                    <input
                      type="text"
                      className="form-control"
                      id={field.toLowerCase()}
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}
                <button type="submit" className="btn btn-primary">Generate Draft</button>
              </form>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Draft;
