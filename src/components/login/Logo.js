import React from 'react'
import { Component } from 'react'
import logo from '../../assets/common/logo'
import './Logo.css'

export default class Logo extends Component {
    render(){
        return(
            <div className="background leftSide"> 
                <img src={logo} alt="logo"></img>
            </div>
        )
        
    }
}
