import React, { Component } from 'react'
import Logo from './Logo'
import LoginForm from '../LoginForm'
import './Login.css'

export default class Login extends Component {
    render(){
        return(
            <div className="loginPage">
                <Logo></Logo>
                <LoginForm></LoginForm> 
            </div>
        )
    }
}