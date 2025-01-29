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

  const handleEstimateCosts = async () => {
    setIsCalculating(true);
    try {
      const data = {
        "cost_breakdown": {
          "Estimated hours": "5 - 20",
          "Hourly rate range": "₹1400.00 - ₹4200.00",
          "Total cost range": "₹7000.00 - ₹84000.00"
        },
        "cost_saving_tips": [
          "Opt for alternative dispute resolution methods like mediation or Lok Adalat",
          "Choose a lawyer with relevant expertise to avoid unnecessary delays",
          "Discuss a fixed-fee arrangement instead of hourly billing where possible",
          "Use legal aid services if eligible (e.g., NALSA, state legal aid commissions)",
          "File online through e-courts to reduce procedural delays"
        ],
        "finding_best_lawyer_tips": [
          "Check the Bar Council of India (BCI) registration of the lawyer",
          "Compare legal fees across multiple lawyers before hiring",
          "Read client reviews and seek references from trusted sources",
          "Prefer advocates experienced in district/high courts for lower fees",
          "Ensure clear communication and written agreement on fees before hiring"
        ],
        "high_cost_areas": [
          "Senior advocates and top-tier law firms charge significantly higher fees",
          "Lengthy litigation processes can increase costs",
          "Expert witnesses and forensic analysis (common in criminal and IP cases)",
          "Multiple appeals and higher court involvement",
          "Cases requiring extensive documentation and legal research"
        ]
      };
      setEstimatedCost(data);
    } catch (error) {
      console.error("Error fetching estimate:", error);
      setEstimatedCost("Error fetching cost");
    } finally {
      setTimeout(() => setIsCalculating(false), 1500);
    }
  };

  return (
    <>
      <TopBar />
      <div className="legal-estimator-wrapper">
        <div className="card mt-4 p-3">
          <div className="text-center mb-4">
            <h4 className="text-secondary">Legal Cost Estimator</h4>
          </div>

          <div className="mb-4">
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

          <button className="btn btn-success w-100 py-2 fw-bold" onClick={handleEstimateCosts} disabled={isCalculating}>
            {isCalculating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> Calculating...
              </>
            ) : (
              "Estimate Costs"
            )}
          </button>

          {estimatedCost && (
            <div className="mt-4 p-3 border rounded bg-light">
                    <h5 style={{
                      color: "#703b13", 
                      fontWeight: 'bold', 
                      textTransform: 'uppercase', 
                      letterSpacing: '1px', 
                      marginBottom: '15px', 
                      borderBottom: '2px solid #703b13', 
                      paddingBottom: '5px', 
                      textAlign: 'center',
                      boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)'
                    }}>
                      Estimated Legal Costs
                    </h5>
              <p><strong>Estimated hours:</strong> <br/> {estimatedCost.cost_breakdown["Estimated hours"]}</p>
              <p><strong>Hourly rate range:</strong> <br/> {estimatedCost.cost_breakdown["Hourly rate range"]}</p>
              <p><strong>Total cost range:</strong><br/> {estimatedCost.cost_breakdown["Total cost range"]}</p>
              
              <h6 className="mt-2" style={{fontWeight:"bold"}}>Cost Saving Tips:</h6>
              <ul>{estimatedCost.cost_saving_tips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
              
              <h6 className="mt-2" style={{fontWeight:"bold"}}>Finding the Best Lawyer:</h6>
              <ul>{estimatedCost.finding_best_lawyer_tips.map((tip, index) => <li key={index}>{tip}</li>)}</ul>
              
              <h6 className="mt-2" style={{fontWeight:"bold"}}>High Cost Areas:</h6>
              <ul>{estimatedCost.high_cost_areas.map((area, index) => <li key={index}>{area}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
