import { useState } from "react";
import { ChevronDown, DollarSign, Briefcase, BarChart2, Scale } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import TopBar from "../components/TopBar";

export default function LegalCostEstimator() {
  const [caseType, setCaseType] = useState("Personal Injury");
  const [complexity, setComplexity] = useState("Moderate");
  const [state, setState] = useState("West Virginia");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleEstimateCosts = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setEstimatedCost("$5,000 - $10,000");
      setIsCalculating(false);
    }, 1500);
  };

  return (
    <>
      <TopBar />
      <div className="legal-estimator-wrapper">
        <div className="card p-3">
          <div className="text-center mb-4">
            <h4 className="text-secondary">Legal Cost Estimator</h4>
          </div>
  
          {/* Case Type Dropdown */}
          <div className="mb-4" >
            <label className="form-label fw-bold d-flex align-items-center">
              <Briefcase className="me-2 text-warning" />
              Select Case Type
            </label>
            <select className="form-select" value={caseType} onChange={(e) => setCaseType(e.target.value)}>
              <option>Personal Injury</option>
              <option>Family Law</option>
              <option>Criminal Defense</option>
              <option>Estate Planning</option>
            </select>
          </div>
  
          {/* Case Complexity Dropdown */}
          <div className="mb-4">
            <label className="form-label fw-bold d-flex align-items-center">
              <BarChart2 className="me-2 text-warning" />
              Select Case Complexity
            </label>
            <select className="form-select" value={complexity} onChange={(e) => setComplexity(e.target.value)}>
              <option>Simple</option>
              <option>Moderate</option>
              <option>Complex</option>
            </select>
          </div>
  
          {/* State Selection */}
          <div className="mb-4">
            <label className="form-label fw-bold d-flex align-items-center">
              <DollarSign className="me-2 text-warning" />
              Select State
            </label>
            <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
              <option>West Virginia</option>
              <option>Virginia</option>
              <option>Maryland</option>
              <option>Pennsylvania</option>
            </select>
          </div>
  
          {/* Estimate Button */}
          <button
            className="btn btn-success w-100 py-2 fw-bold"
            onClick={handleEstimateCosts}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> Calculating...
              </>
            ) : (
              "Estimate Costs"
            )}
          </button>
  
          {/* Estimated Cost Output */}
          {estimatedCost && (
            <div className="alert alert-primary text-center mt-4 fw-bold" role="alert">
              Estimated Legal Costs: <br />
              <span className="fs-4">{estimatedCost}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
