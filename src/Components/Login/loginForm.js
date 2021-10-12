import React, { Component } from 'react'

export default class LoginForm extends Component {
    render(){
        return (
                <div className="bg-login col-md-6 d-flex align-items-center justify-content-center p-0 m-0">
                    <form className="loginForm ">
                        <h3 className="text-white">Sign In</h3>
                        <div className="form-group pt-3">
                            <input type="email" className="form-control" placeholder="Email address" />
                        </div>
                        <div className="form-group pt-3">
                            <input type="password" className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group py-3">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label text-white ps-1" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>  
                        <button type="submit" className="btn btn-danger btn-block">Submit</button>
                        <p className="forgot-password text-right pt-3">
                            <a href="/reset" className="text-decoration-none text-danger">Forgot password?</a>
                        </p>
                        <p className="no-account text-right pt-3">
                            <a href="/register" className="text-decoration-none text-warning"> Don't have an account? Sign Up!</a>
                        </p>
                    </form>
                </div>
        )
    }

}
