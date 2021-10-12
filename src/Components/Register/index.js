import React from 'react'
import Logo from '../Login/logo'
import RegisterForm from './registerForm'
import './index.css'

const Register = () => {
    return (
        <div className="registerPage row flex-sm-row align-items-center p-0 m-0">
            <Logo/>
            <RegisterForm/>
        </div>  
    )
}

export default Register;