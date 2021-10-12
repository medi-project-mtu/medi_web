import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";


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
                        
                        placeholder="Email address"
                        value={email} />
                    </div>
                    <div className="form-group pt-3">
                        <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        
                        placeholder="Password"
                        value={password}/>
                    </div>
                    <div className="form-group py-3">
                        <div className="custom-control custom-checkbox">
                            <input type="checkbox" className="custom-control-input" id="customCheck1" />
                            <label className="custom-control-label text-white ps-1" htmlFor="customCheck1">Remember me</label>
                        </div>
                    </div>  
                    <button type="submit" className="btn btn-danger btn-block">Log In</button>
                    <p className="forgot-password text-right pt-3">
                        <a href="/login" className="text-decoration-none text-danger">Forgot password?</a>
                    </p>
                </form>
            </div>
    )
}
