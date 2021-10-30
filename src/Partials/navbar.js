import React from 'react'
import './navbar.css'
import Logo from '../Assets/Common/logo.png'
import { Link } from 'react-router-dom'
import dood from '../Assets/Common/dood.png'
import { logout } from '../Components/Firebase'
import dashboardLogo from '../Assets/Common/dashboard.png'

export default function navbar({name}) {
    return (

        <div className="bg-nav">
            <div className="wrapper">
                <nav className="navbar navbar-dark justify-content-start">
                    <Link className="" to="/dashboard"><img src={Logo} alt="Logo of mediweb" className="navbar-logo"></img></Link>
                    <div className="navbar-nav flex-row align-items-center ps-5">
                        <Link className="nav-link active px-3" to="/dashboard"><img src={dood} alt="avatar" className="avatar-pic"></img></Link>
                        <Link className="nav-link active px-3" to="/dashboard"><h3>{name}</h3></Link>
                        <Link className="btn btn-primary back-button px-3" to="/dashboard">Back</Link>
                        <div className="btn btn-light logout-button px-3" onClick={logout}>Log out</div>
                    </div>
                </nav>
            </div>
        </div>
        
        
    )
}
