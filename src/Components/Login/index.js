import React from 'react';
import Logo from "./logo";
import LoginForm from './loginForm'
import './index.css'

const Login = () => {
    return (
        <div className="loginPage row flex-sm-row align-items-center p-0 m-0">
            <Logo/>
            <LoginForm/>
        </div>  
    )
}


export default Login;