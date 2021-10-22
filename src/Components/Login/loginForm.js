import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { 
    auth,
    signInWithEmailAndPassword,
    signInWithProvider,
    googleProvider,
    fbProvider,
    logout,
    fetchSignInMethod,
    fetchUserRole
} from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import GoogleGLogo from '../../Assets/Common/Google__G__Logo.svg'
import FacebookLogo from '../../Assets/Common/Facebook_f_logo_(2019).svg'
import Modal from 'react-bootstrap/Modal'
import SocialModalForm from './SocialModalForm'

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const [showSocialForm, setShowSocialForm] = useState(false);
    const handleShowSocialForm = () => setShowSocialForm(true)
    const handleCloseSocialForm = () => setShowSocialForm(false);

    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        if (user) {
            let roleGp = fetchUserRole(user, "Gp/")
            console.log(roleGp)
            const provider = user.providerData[0].providerId
            if (provider == "google.com" || provider == "facebook.com") {
                let rolePatient = fetchUserRole(user, "Patient/")
                if (rolePatient){
                    alert("You don't have the permission to acces this page.")
                    logout()
                } else if (!roleGp) {
                    handleShowSocialForm();
                } else history.replace("/dashboard");
            }
            else if (roleGp) {
                if (!user.emailVerified) {
                    handleShow();
                    emailVerificationSleep();
                }
                else history.replace("/dashboard");
            }
            else {         
                alert("You don't have the permission to acces this page.")
                logout()
            }
 
        }}, [user, loading]);

    const emailVerificationSleep = () => {
        setTimeout( function() {
            user.reload()
            if (user.emailVerified) history.replace("/dashboard");
            else emailVerificationSleep();
        }, 1000 );
    }

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
                    value={email}
                    onKeyPress={event => { if (event.key === 'Enter') signInWithEmailAndPassword(email, password)}}/>
                </div>
                <div className="form-group pt-3">
                    <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    value={password}
                    onKeyPress={event => { if (event.key === 'Enter') signInWithEmailAndPassword(email, password)}}/> 
                </div>
                <p className="forgot-password text-end mb-1">
                    <Link to="/reset" className="text-decoration-none text-danger">Forgot password?</Link>
                </p>
                
                <div className="row p-0 m-0 justify-content-md-center">
                    <img src={GoogleGLogo} alt="logo" className="col-sm-auto logo-google btn" onClick={() => signInWithProvider(googleProvider)}/>
                    <img src={FacebookLogo} alt="logo" className="col-sm-auto logo-facebook btn" onClick={() => signInWithProvider(fbProvider)}/>
                </div>

                <button
                    className="w-100 btn btn-danger btn-block mt-3"
                    onClick={() => signInWithEmailAndPassword(email, password)}
                >Log In</button>

                <p className="text-white pt-3 text-center">Don't have an account? <Link 
                    className="mt-3 text-danger text-decoration-none"
                    to="/register"
                >Sign up with email</Link></p>
                
                <Modal show={show} >
                    <Modal.Header>
                        <Modal.Title>Authentication Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h5>Hey {user?.email}!</h5>
                        <p>It looks like you haven't verified your email yet.</p>
                        <p>Please check your email.</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-secondary" onClick={() => { logout(); handleClose();}}>
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
export default LoginForm;