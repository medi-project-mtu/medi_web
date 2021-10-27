import React from 'react'
import './navbar.css'
import Logo from '../Assets/Common/logo.png'
import { Link } from 'react-router-dom'
import dood from '../Assets/Common/dood.png'
import { logout } from '../Components/Firebase'
import dashboardLogo from '../Assets/Common/dashboard.png'

export default function navbar({name}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/dashboard"><img src={Logo} alt="Logo of mediweb" className="navbar-logo"></img></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex align-items-center">
                        <Link className="nav-link active" aria-current="page" to="/dashboard"><img src={dood} alt="avatar" className="avatar-pic"></img></Link>
                        <Link className="nav-link active" to="/dashboard"><h3>{name}</h3></Link>
                        <button type="button" className="btn-light logout-button" onClick={logout}>Log out</button>
                    </div>
                </div>
                <Link className="navbar-brand" to="/dashboard"><img src={dashboardLogo} alt="Logo of mediweb" className="dashboard-logo"></img></Link>
            </div>
        </nav>
    )
}
