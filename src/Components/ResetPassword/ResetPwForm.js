import React, { Component } from 'react'

export default class ResetPassword extends Component {
    render(){
        return (
                <div className="bg-reset col-md-6 d-flex align-items-center justify-content-center p-0 m-0">
                    <form className="resetForm">
                        <h3 className="text-white">Please enter your email to reset your password.</h3>
                        <div className="form-group pt-3">
                            <input type="email" className="form-control" placeholder="Email address" />
                        </div>
                        
                        <div className="form-group py-3"></div>  
                        
                        <button type="submit" className="btn btn-danger btn-block">Submit</button>
                        <p className="forgot-password text-right pt-3">
                            <a href="/login" className="text-decoration-none text-danger">Already have an account? Sign in.</a>
                        </p>
                    </form>
                </div>
        )
    }

}
