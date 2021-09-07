import React  from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import "./Login.css";
export default class Login extends React.Component{
    
    render(){
        return (
                <div className="welcome">
                    <h1>Welcome to Loan Management</h1>
                    <Link className="login" to="/login">Login</Link>
                </div>
        )
    }
        
    
}