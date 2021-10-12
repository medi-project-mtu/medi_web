import React from 'react';
import Logo from "./logo";
import LoginForm from './loginForm'
import './login.css'

const Login = () => {
    return (
        <div className="row flex-lg-row align-items-center g-5 loginPage">
            <Logo/>
            <LoginForm/>
        </div>
    )
}


export default Login;