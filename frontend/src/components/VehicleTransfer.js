import React, { useState } from 'react';
import jsPDF from 'jspdf';

const VehicleTransferForm = () => {
  const [part1Data, setPart1Data] = useState({
    transferor: '',
    relation: '',
    address: '',
    registration: '',
    transferDate: '',
    transferee: '',
    transfereeRelation: '',
    transfereeAddress: '',
  });

  const [part2Data, setPart2Data] = useState({
    transferee: '',
    transfereeRelation: '',
    transfereeAddress: '',
    transferDate: '',
    financierConsent: '',
  });

  const handleInputChange = (e, part) => {
    const { id, value } = e.target;
    if (part === 1) {
      setPart1Data({
        ...part1Data,
        [id]: value,
      });
    } else {
      setPart2Data({
        ...part2Data,
        [id]: value,
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const marginLeft = 20;
    const marginRight = 20;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - marginLeft - marginRight;
    let yOffset = 20;

    // Title
    doc.setFontSize(16);
    doc.text("Report of Transfer of Ownership of a Motor Vehicle", marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 10;

    // Part 1 - Transferor Section
    doc.setFontSize(12);
    doc.text(`To,\nThe Registering Authority`, marginLeft, yOffset);
    yOffset += 10;

    doc.text(`Name of the Transferor: ${part1Data.transferor || '_______________'}`, marginLeft, yOffset);
    yOffset += 6;
    doc.text(`Son/Wife/Daughter of: ${part1Data.relation || '_______________'}`, marginLeft, yOffset);
    yOffset += 6;
    doc.text(`Full Address: ${part1Data.address || '_______________'}`, marginLeft, yOffset);
    yOffset += 10;

    doc.text(`I, hereby, declare that I/we have on this ${part1Data.transferDate || '_______________'} sold my/our motor vehicle bearing registration mark ${part1Data.registration || '_______________'} to Shri/Smt. ${part1Data.transferee || '_______________'} Son/Wife/Daughter of: ${part1Data.transfereeRelation || '_______________'} residing at: ${part1Data.transfereeAddress || '_______________'} and handed over the certificate of registration and the certificate of insurance to him/her/them.`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 20;

    doc.text(`I/we hereby declare that to the best of my/our knowledge the certificate of registration of the vehicle has been/has not been suspended or cancelled.`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 20;

    doc.text("**I enclose the ‘No Objection Certificate’ issued by the Registering Authority.** If the ‘No Objection Certificate’ from the registering authority is not enclosed, the transferor should file along with this application a declaration as required under sub-section (1) of Section 50.", marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 20;

    doc.text("Signature of the Transferor: ______________________", marginLeft, yOffset);
    yOffset += 10;
    doc.text(`Date: ${part1Data.transferDate || '_______________'}`, marginLeft, yOffset);
    yOffset += 20;

    // Part 2 - Transferee Section
    doc.setFontSize(16);
    doc.text("PART II-For the use of Transferee", marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 10;

    doc.setFontSize(12);
    doc.text(`To,\nThe Registering Authority`, marginLeft, yOffset);
    yOffset += 10;

    doc.text(`Name of the Transferor: ${part1Data.transferor || '_______________'}`, marginLeft, yOffset);
    yOffset += 6;
    doc.text(`Son/Wife/Daughter of: ${part1Data.relation || '_______________'}`, marginLeft, yOffset);
    yOffset += 6;
    doc.text(`Full Address: ${part1Data.address || '_______________'}`, marginLeft, yOffset);
    yOffset += 10;

    doc.text(`I, hereby, declare that I/we have on this ${part2Data.transferDate || '_______________'} purchased the motor vehicle bearing registration mark ${part1Data.registration || '_______________'} from ${part2Data.transferee || '_______________'} and request that necessary entries regarding the transfer of ownership of the vehicle in my/our name may be recorded in the certificate of registration/certificate of fitness of the vehicle, which is enclosed.`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 30;

    doc.text(`Signature of the transferee\n(1)\n(2)`, marginLeft, yOffset);
    yOffset += 20;

    doc.text(`Consent of the financier in the case of motor vehicle subject to an agreement of the hire-purchase/lease/hypothecation.`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 20;

    doc.text(`I/We being a party to an agreement of hire-purchase/lease/hypothecation in respect of motor vehicle ........................ give consent to the transfer of ownership of the said vehicle to Shri/Smt./Kumari ........................ with whom I/we have entered into an agreement of hire-purchase/lease/hypothecation.`, marginLeft, yOffset, { maxWidth: contentWidth });
    yOffset += 20;

    doc.text("Signature of the financer: ______________________ \n Date ............ \n Office endorsement", marginLeft, yOffset);
    yOffset += 30;

    // Save the PDF
    doc.save("vehicle_transfer.pdf");
  };

  return (
    <div className="container mt-4 px-0">
      {/* <h2 className="mb-4">Vehicle Ownership Transfer Form</h2> */}
      <form class="card" style={{padding: "17px", marginBottom: "17px"}} onSubmit={(e) => { e.preventDefault(); generatePDF(); }}>
        <h6>Part 1: Transferor Information</h6>
        <div className="mb-3">
          <label className="form-label">Transferor's Name</label>
          <input type="text" className="form-control" id="transferor" onChange={(e) => handleInputChange(e, 1)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Relation</label>
          <input type="text" className="form-control" id="relation" onChange={(e) => handleInputChange(e, 1)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea className="form-control" id="address" rows="3" onChange={(e) => handleInputChange(e, 1)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Vehicle Registration Mark</label>
          <input type="text" className="form-control" id="registration" onChange={(e) => handleInputChange(e, 1)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Transferee's Name</label>
          <input type="text" className="form-control" id="transferee" onChange={(e) => handleInputChange(e, 1)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Transferee's Relation</label>
          <input type="text" className="form-control" id="transfereeRelation" onChange={(e) => handleInputChange(e, 1)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Transferee's Address</label>
          <textarea className="form-control" id="transfereeAddress" rows="3" onChange={(e) => handleInputChange(e, 1)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Transfer</label>
          <input type="date" className="form-control" id="transferDate" onChange={(e) => handleInputChange(e, 1)} />
        </div>

        <h6>Part 2: Transferee Information</h6>
        <div className="mb-3">
          <label className="form-label">Transferee's Name</label>
          <input type="text" className="form-control" id="transferee" onChange={(e) => handleInputChange(e, 2)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Transferee's Relation</label>
          <input type="text" className="form-control" id="transfereeRelation" onChange={(e) => handleInputChange(e, 2)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Transferee's Address</label>
          <textarea className="form-control" id="transfereeAddress" rows="3" onChange={(e) => handleInputChange(e, 2)}></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Date of Transfer</label>
          <input type="date" className="form-control" id="transferDate" onChange={(e) => handleInputChange(e, 2)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Consent of Financier (if applicable)</label>
          <textarea className="form-control" id="financierConsent" rows="3" onChange={(e) => handleInputChange(e, 2)}></textarea>
        </div>

        <button type="submit" className="btn btn-primary">Generate PDF</button>
      </form>
    </div>
  );
};

export default VehicleTransferForm;
