import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "../../Firebase";

function ResetPassword() {
    const [email, setEmail] = useState("");

    return (
            <div className="bg-signinup col-md-6 d-flex align-items-center justify-content-center p-0 m-0">
                <div className="resetForm">
                    <h3 className="text-white text-center">Find your medi-web account.</h3>
                    <div className="form-group pt-3">
                        <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                    </div>
                                        
                    <button 
                    className="w-100 btn btn-danger btn-block mt-3" 
                    onClick={() => sendPasswordResetEmail(email)}>
                        Search
                    </button>

                    <p className="forgot-password text-white text-center pt-3">
                        Already have an account? 
                    <Link to="/" className="text-decoration-none text-danger"> Sign in.</Link>
                </p>
                </div>
            </div>
    )
}

export default ResetPassword