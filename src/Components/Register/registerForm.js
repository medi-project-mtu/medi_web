import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase";
import GoogleGLogo from '../../Assets/Common/Google__G__Logo.svg'

import Modal from 'react-bootstrap/Modal'


function Register() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        emailVerificationSleep();
    }

    const register = () => {
      if (!name) alert("Please enter name");
      registerWithEmailAndPassword(name, email, password);
    };

    useEffect(() => {
      if (loading) return;
      if (user) {
        if (!user.emailVerified) handleShow();
        else history.replace("/dashboard");
    }}, [user, loading]);
    
    const emailVerificationSleep = () => {
        setTimeout( function() {
            user.reload()
            if (user.emailVerified) history.replace("/dashboard");
            else emailVerificationSleep();
        }, 1000 );
    }


    return (
        <div className="bg-register col-md-6 d-flex align-items-center justify-content-center p-0 m-0">
            <div className="registerForm ">
                <h3 className="text-white text-center">Sign up!</h3>
                <div className="form-group pt-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Full Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    onKeyPress={event => {if (event.key === 'Enter') register()}}
                    />
                </div>
                <div className="form-group pt-3">
                    <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={event => {if (event.key === 'Enter') register()}}
                    />
                </div>
                <div className="form-group pt-3">
                    <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={event => {if (event.key === 'Enter') register()}}
                    />
                </div>
            
                <button
                    className="w-100 btn btn-danger btn-block mt-3"
                    onClick={register}>
                    Sign up with email
                </button>
                <h5 className="text-white text-center mt-2">Or use</h5>
                <img src={GoogleGLogo} alt="logo" className="p-0 m-0 btn logo-google text-center" onClick={signInWithGoogle}/>

                <p className="forgot-password text-white text-center pt-3">
                Already have an account? 
                    <Link to="/" className="text-decoration-none text-danger"> Sign in.</Link>
                </p>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header>
                        <Modal.Title>Email verification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Hey {name}!</h5>
                        <p>We just sent you an email to verify your account.</p>
                        <p>Please check your email to continue.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => { handleClose();}}>
                        Log Out
                        </button>
                        <button className="btn btn-primary" 
                        onClick={user?.sendEmailVerification()}>
                        Send new email
                        </button>   
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}

export default Register;