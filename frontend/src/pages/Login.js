import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
 
const Login = () => {
  const [phone, setPhone] = useState("");

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg border-0" style={{ maxWidth: "375px", width: "100%", borderRadius: "12px", height: "100%", alignItems: "center", justifyContent: "center"}}>
        {/* Logo */}
        <DotLottieReact
      src="https://lottie.host/84546757-3e00-4b02-b1ec-4af2c0387c5b/PlAGCDey32.json"
      loop
      autoplay style={{ width: "150px", height: "150px" }}
    />        {/* Welcome Text */}
        <h4 className="text-center mt-1">Welcome Back</h4>
        <p className="text-center text-muted">Please sign in to your account</p>

        {/* Phone Input */}
        <div className="mt-3">
          <PhoneInput
            country={"in"}
            value={phone}
            onChange={setPhone}
            inputClass="form-control"
            containerClass="w-100"
          />
        </div>

        {/* Info Message */}
        <p className="text-center text-muted small mt-2">
          We will send you a one-time SMS message. Charges may apply.
        </p>

        {/* Submit Button */}
        <button className="btn btn-warning w-100 mt-3 fw-bold py-2">
          Sign In with OTP
        </button>
      </div>
    </div>
  );
};

export default Login;
