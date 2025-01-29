import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function OtpVerification() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (element, index) => {
    if (isNaN(Number(element.value)) && element.value !== "") return false; // Only allow numbers

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.value !== "") {
      const nextElement = element.nextElementSibling;
      if (nextElement) {
        nextElement.focus();
      }
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && otp[index] === "") {
      const prevElement = event.target.previousElementSibling;
      if (prevElement) {
        prevElement.focus();
      }
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center">
    <DotLottieReact
      src="https://lottie.host/3dcd1104-2485-43bf-b7cf-314d837a9d3e/xuOht9kr6X.json"
      loop
      autoplay style={{ width: "150px", height: "150px" }}
    />
      <div className="col-12 col-sm-10 col-md-6 col-lg-4 px-4">
        <div className="text-center mb-4">
          <h2 className="h5 mb-3">Please verify Mobile number</h2>
          <p className="text-muted small mb-2">An OTP is sent to +91 9305485633</p>
          <a href="#" className="text-decoration-none" style={{ color: "#F7B614" }}>
            Change Phone Number
          </a>
        </div>

        <div className="d-flex justify-content-between gap-2 mb-4">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="form-control text-center"
              style={{
                width: "45px",
                height: "45px",
                fontSize: "1.2rem",
              }}
            />
          ))}
        </div>

        <p className="text-center text-muted small mb-4">
          Didn't receive the OTP?{" "}
          <a href="#" className="text-decoration-none" style={{ color: "#F7B614" }}>
            Resend OTP
          </a>
        </p>

        <button
          className="btn w-100 py-3"
          style={{
            backgroundColor: "#F7B614",
            color: "black",
            fontWeight: "500",
          }}
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
}
