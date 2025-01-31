import { useState } from "react";
import { ChevronDown, DollarSign, Briefcase, BarChart2, Scale } from "lucide-react";
import TopBar from "../components/TopBar";
import axios from "axios"; // Ensure you have axios installed

export default function LegalCostEstimator() {
  const [caseType, setCaseType] = useState("Tax Law");
  const [complexity, setComplexity] = useState("Simple");
  const [state, setState] = useState("Andhra Pradesh");
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleEstimateCosts = async () => {
    setIsCalculating(true);
    try {
      // Prepare the request body
      const requestData = {
        case_type: caseType,
        complexity: complexity,
        state: state
      }; 

      // Send POST request to the backend
      const response = await axios.post("http://localhost:8080/legalcost", requestData);
      // // Set the received data to the state
      setEstimatedCost(response.data);
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

          {/* Case Type Selector */}
          <div className="mb-4">
            <label className="form-label fw-bold d-flex align-items-center">
              <Briefcase className="me-2 text-warning" />
              Select Case Type
            </label>
            <select className="form-select" value={caseType} onChange={(e) => setCaseType(e.target.value)}>
              <option value="Tax Law">Tax Law</option>
              <option value="Family Law">Family Law</option>
              <option value="Criminal Defense">Criminal Defense</option>
              <option value="Real Estate Law">Real Estate Law</option>
              <option value="Immigration Law">Immigration Law</option>
              <option value="Employment Law">Employment Law</option>
              <option value="Intellectual Property">Intellectual Property</option>
              <option value="Business Law">Business Law</option>
              <option value="Criminal Law">Criminal Law</option>
              <option value="Civil Litigation">Civil Litigation</option>
            </select>

          </div>

          {/* Complexity Selector */}
          <div className="mb-4">
            <label className="form-label fw-bold d-flex align-items-center">
              <BarChart2 className="me-2 text-warning" />
              Select Case Complexity
            </label>
            <select className="form-select" value={complexity} onChange={(e) => setComplexity(e.target.value)}>
              <option value="Simple">Simple</option>
              <option value="Moderate">Moderate</option>
              <option value="Complex">Complex</option>
            </select>
          </div>

          {/* State Selector */}
          <div className="mb-4">
            <label className="form-label fw-bold d-flex align-items-center">
              <DollarSign className="me-2 text-warning" />
              Select State
            </label>
            <select className="form-select" value={state} onChange={(e) => setState(e.target.value)}>
              <option value="Andhra Pradesh">Andhra Pradesh</option>
              <option value="Arunachal Pradesh">Arunachal Pradesh</option>
              <option value="Assam">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Chhattisgarh">Chhattisgarh</option>
              <option value="Goa">Goa</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Haryana">Haryana</option>
              <option value="Himachal Pradesh">Himachal Pradesh</option>
              <option value="Jharkhand">Jharkhand</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Kerala">Kerala</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Manipur">Manipur</option>
              <option value="Meghalaya">Meghalaya</option>
              <option value="Mizoram">Mizoram</option>
              <option value="Nagaland">Nagaland</option>
              <option value="Odisha">Odisha</option>
              <option value="Punjab">Punjab</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Sikkim">Sikkim</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Telangana">Telangana</option>
              <option value="Tripura">Tripura</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Uttarakhand">Uttarakhand</option>
              <option value="West Bengal">West Bengal</option>
            </select>
          </div>

          {/* Estimate Button */}
          <button className="btn btn-success w-100 py-2 fw-bold" onClick={handleEstimateCosts} disabled={isCalculating}>
            {isCalculating ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span> Calculating...
              </>
            ) : (
              "Estimate Costs"
            )}
          </button>

          {/* Display Estimated Costs */}
          {estimatedCost && (
            <div className="mt-4 p-3 border rounded bg-light">
              <h5
                style={{
                  color: "#703b13",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  marginBottom: "15px",
                  borderBottom: "2px solid #703b13",
                  paddingBottom: "5px",
                  textAlign: "center",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)"
                }}
              >
                Estimated Legal Costs
              </h5>
              <p>
                <strong>Estimated hours:</strong> <br /> {estimatedCost.cost_breakdown["Estimated hours"]}
              </p>
              <p>
                <strong>Hourly rate range:</strong> <br /> {estimatedCost.cost_breakdown["Hourly rate range"]}
              </p>
              <p>
                <strong>Total cost range:</strong><br /> {estimatedCost.cost_breakdown["Total cost range"]}
              </p>

              {/* Cost Saving Tips */}
              <h6 className="mt-2" style={{ fontWeight: "bold" }}>
                Cost Saving Tips:
              </h6>
              <ul>
                {estimatedCost.cost_saving_tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>

              {/* Finding the Best Lawyer */}
              <h6 className="mt-2" style={{ fontWeight: "bold" }}>
                Finding the Best Lawyer:
              </h6>
              <ul>
                {estimatedCost.finding_best_lawyer_tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>

              {/* High Cost Areas */}
              <h6 className="mt-2" style={{ fontWeight: "bold" }}>
                High Cost Areas:
              </h6>
              <ul>
                {estimatedCost.high_cost_areas.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>

              {/* Web Search Results */}
              <h6 className="mt-2" style={{ fontWeight: "bold" }}>
                Web Search Results:
              </h6>
              <ul>
                {estimatedCost.web_search_results.map((result, index) => (
                  <li key={index}>
                    <a href={result.link} target="_blank" rel="noopener noreferrer">
                      <strong>{result.title}</strong>
                    </a>
                    <p>{result.snippet}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
