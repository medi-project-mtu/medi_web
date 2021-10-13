import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleGLogo from '../../Assets/Common/Google__G__Logo.svg'

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) history.replace("/dashboard");
        }, [user, loading]
    );
    return (
        <div className="bg-login col-md-6 d-flex align-items-center justify-content-center p-0 m-0">
            <div className="loginForm">
                <h3 className="text-white text-center">Log In</h3>
                <div className="form-group pt-3">
                    <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    value={email} />
                </div>
                <div className="form-group pt-3">
                    <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password}/>
                </div>
                <p className="forgot-password text-end mb-1">
                    <Link to="/reset" className="text-decoration-none text-danger">Forgot password?</Link>
                </p>
                
                <img src={GoogleGLogo} alt="logo" className="p-0 m-0 btn logo-google text-center" onClick={signInWithGoogle}/>

                <button
                    className="w-100 btn btn-danger btn-block mt-3"
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >Log In</button>

                <p className="text-white pt-3 text-center">Don't have an account? <Link 
                    className="mt-3 text-danger text-decoration-none"
                    to="/register"
                >Sign up with email</Link></p>
                
            </div>
        </div>
    )
}
export default LoginForm;