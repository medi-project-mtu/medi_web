import React from 'react'
import { Component } from 'react'
import logo from '../../Assets/Common/logo.png'

export default class Logo extends Component {
    render(){
        return(
                <div className="bg-logo text-center col-md-6 p-0 m-0">
                    <div className="d-flex align-items-center justify-content-center h-100">
                        <img src={logo} alt="logo" className="flex logo-medi"/>
                    </div>
                </div>
        )
        
    }
}
