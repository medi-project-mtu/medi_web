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
            <form className="loginForm ">
                <h3 className="text-white">Sign In</h3>
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
                <div className="form-group py-3">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label text-white ps-1" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div className="row p-0 m-0">
                    <button
                        className="col-3 btn btn-danger btn-block"
                        onClick={() => signInWithEmailAndPassword(email, password)}
                    >Log In</button>
                    <h5 className="col-4 text-white mb-0 p-0 pt-2 text-center">Or use</h5>
                    <img src={GoogleGLogo} alt="logo" className="col-2 btn logo-google" onClick={signInWithGoogle}/>
                </div>

                <p className="forgot-password text-right pt-3">
                    <a href="/login" className="text-decoration-none text-danger">Forgot password?</a>
                </p>
            </form>
        </div>
    )
}
export default LoginForm;