import React from 'react';
import Logo from "./logo";
import LoginForm from './loginForm'
import './index.css'

const Login = () => {
    return (
        <div className="loginPage row flex-lg-row align-items-center g-5">
            <Logo/>
            <LoginForm/>
        </div>
    )
}


export default Login;