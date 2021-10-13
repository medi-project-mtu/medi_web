import React from 'react'
import Logo from '../Login/logo'
import ResetPassword from './ResetPwForm'
import './index.css'

const ResetPwd = () => {
    return (
        <div className="resetPage row flex-sm-row align-items-center p-0 m-0">
            <Logo/>
            <ResetPassword/>
        </div>  
    );
}

export default ResetPwd;