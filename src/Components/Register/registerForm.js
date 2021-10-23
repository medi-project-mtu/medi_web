import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useHistory } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithProvider,
  logout,
  fetchSignInMethod,
  googleProvider,
  fbProvider,
  fetchUserRole
} from "../Firebase";
import GoogleGLogo from '../../Assets/Common/Google__G__Logo.svg'
import FacebookLogo from '../../Assets/Common/Facebook_f_logo_(2019).svg'
import ModalForm from "./ModalForm";
import Modal from 'react-bootstrap/Modal'
import SocialModalForm from '../Login/SocialModalForm'


function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [eirCode, setEirCode] = useState("");
    const [phone, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [practice, setPractice] = useState("");
    const userDetails = [email, password, name, dob, eirCode, phone, gender, specialization, practice]

    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [showAdditional, setAdditional] = useState(false);
    
    const [role, setRole] = useState("");
    const [provider, setProvider] = useState("")
    const [rolePatient, setRolePatient] = useState("");


    const [showSocialForm, setShowSocialForm] = useState(false);
    const handleShowSocialForm = () => setShowSocialForm(true)
    const handleCloseSocialForm = () => setShowSocialForm(false);
    
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        setShow(true);
        emailVerificationSleep();
    }

    const handleAdditionalClose = () => setAdditional(false)
    const handleAdditionalShow = () => setAdditional(true);

    const handleModalSubmit = () => {
        if (!dob) alert("Please enter your date of birth")
        if (!eirCode) alert("Please enter your Eir Code") 
        if (!phone) alert("Please enter your phone") 
        if (!gender) alert("Please enter your gender") 
        if (!specialization) alert("Please enter your specialization") 
        if (!practice) alert("Please enter your medical practice") 
        handleAdditionalClose();
        registerWithEmailAndPassword(userDetails);
    }

    const register = async () => {
        if (!name) return alert("Please enter name");
        if (!email) return alert("Please enter an email");
        if (!password || password.length < 6) return alert("Please enter a password with at least 6 characters.");
        const emailVerify = await fetchSignInMethod(email);
        if (emailVerify.length > 0) return alert("Email already in use!");
        handleAdditionalShow();
    };

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            async function fetchRoles() {
                setIsLoading(true)
                setRole(await fetchUserRole(user, "Gp/"))
                setRolePatient(await fetchUserRole(user, "Patient/"))
                setIsLoading(false)
            }
            fetchRoles()
            setProvider(user.providerData[0].providerId)
    }}, [user, loading]);
    
    useEffect(() => {
        if (user && !isLoading){
            if (provider === "google.com" || provider === "facebook.com") {
                if (rolePatient){
                    alert("1You don't have the permission to acces this page.")
                    logout()
                } else if (!role) {
                    handleShowSocialForm();
                } else history.replace("/dashboard");
            }
            else if (role) {
                if (!user.emailVerified) {
                    handleShow();
                    emailVerificationSleep();
                }
                else history.replace("/dashboard");
            }
            else {         
                alert("2You don't have the permission to acces this page.")
                logout()
            }
        }
    }, [isLoading])    

    const emailVerificationSleep = () => {
        setTimeout( function() {
            user.reload()
            if (user.emailVerified) history.replace("/dashboard");
            else emailVerificationSleep();
        }, 1000 );
    }

    return (
        <div 
        className="bg-register col-md-6 d-flex align-items-center justify-content-center p-0 m-0"
        onKeyDown={event => {if (event.key === 'Enter') register()}} >
            <div className="registerForm " >
                <h3 className="text-white text-center">Sign up!</h3>
                <div className="form-group pt-3">
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Full Name"
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group pt-3">
                    <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group pt-3">
                    <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            
                <button
                    className="w-100 btn btn-danger btn-block mt-3"
                    onClick={register}>
                    Sign up with email
                </button>
                <h5 className="text-white text-center mt-2">Or use</h5>
                
                <div className="row p-0 m-0 justify-content-md-center">
                    <img src={GoogleGLogo} alt="logo" 
                    className={"col-sm-auto logo-google btn" + (isLoading ? ' disabled': '')}
                    onClick={() => signInWithProvider(googleProvider)}/>
                    <img src={FacebookLogo} alt="logo" 
                    className={"col-sm-auto logo-facebook btn" + (isLoading ? ' disabled': '')}
                    onClick={() => signInWithProvider(fbProvider)}/>
                </div>

                <p className="forgot-password text-white text-center pt-3">
                Already have an account? 
                    <Link to="/" className="text-decoration-none text-danger"> Sign in.</Link>
                </p>

                <Modal show={showAdditional} onHide={handleAdditionalClose}>
                    <Modal.Header >
                        <Modal.Title>Profile Setup</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalForm
                            modDob={setDob}
                            modPhone={setPhone}
                            modEircode={setEirCode}
                            modGender={setGender}
                            modSpe={setSpecialization}
                            modPrac={setPractice}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="w-100 btn btn-danger btn-block mt-3" onClick={handleModalSubmit}>
                            Submit
                        </button>
                        <button className="w-100 btn btn-secondary btn-block mt-3" onClick={handleAdditionalClose}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>

                <Modal show={show}>
                    <Modal.Header>
                        <Modal.Title>Email verification</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Hey {name}!</h5>
                        <p>We just sent you an email to verify your account.</p>
                        <p>Please check your email to continue.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => {logout(); handleClose();}}>
                        Log Out
                        </button>
                        <button className="btn btn-primary" 
                        onClick={() => {user.reload(); user.sendEmailVerification();}}>
                        Send new email
                        </button>   
                    </Modal.Footer>
                </Modal>

                <Modal show={showSocialForm} onHide={() => { logout(); handleCloseSocialForm();}}>
                    <SocialModalForm modClose={handleCloseSocialForm}/>
                </Modal>

            </div>
        </div>
    )
}

export default Register;