import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Logo from "./logo";
import LoginForm from './Login/loginForm'
import RegisterForm from './Register/registerForm'
import ResetPassword from './ResetPassword/resetPwForm'
import './index.css'

const Signingup = () => {
    return (
        <div className="loginPage row flex-sm-row align-items-center p-0 m-0">
            <Logo/>
            <Switch>
                {/* <Route component={LoginForm}/> */}
                <Route exact path="/" component={LoginForm}/>
                <Route exact path="/register" component={RegisterForm}/>
                <Route exact path="/reset" component={ResetPassword}/>
            </Switch>
        </div>  
    )
}


export default Signingup;