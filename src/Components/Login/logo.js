import React from 'react'
import { Component } from 'react'
import logo from '../../Assets/Common/logo.png'

export default class Logo extends Component {
    render(){
        return(
                <div className="background text-center col-lg-6 leftSide ">
                    <img src={logo} alt="logo" className="mx-auto"/>
                </div>
        )
        
    }
}
