import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../Firebase";

function ResetPassword() {
    const [email, setEmail] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    useEffect(() => {
        if (loading) return;
        if (user) history.replace("/dashboard");
    }, [user, loading]);

    return (
            <div className="bg-reset col-md-6 d-flex align-items-center justify-content-center p-0 m-0">
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