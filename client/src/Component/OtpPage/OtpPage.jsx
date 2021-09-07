import React, { useState,useEffect }  from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import "./Otp.css"
export default function OtpPage (props){
    const [OTP,setOTP] = useState('');
    const [validateOTP,setvalidateOTP] = useState(false);
    const [validOTP,setValidOTP] = useState('');
    const [msg, setMSG] = useState("");
    let history = useHistory();
    const typeOTP = (event) =>{
        setOTP(event.target.value);
        setvalidateOTP(false);
    }
    useEffect(()=>{
        // console.log("validateOTP",validateOTP);
        if(validateOTP){
            // console.log("OTP",OTP);
            const Email = props.email || localStorage.getItem('email');
            const data = {email:Email,otp:OTP};
            // console.log("DATA",data);
            const url = '/otp';
            fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {   
                // console.log("typed email", typeof data.validOtp);
                setValidOTP(data.validOtp)
                });
            // console.log(validOTP)
        }
        if(validOTP){
            history.push("/dashboard");
        }
        else if(validOTP!==""){
            setMSG("Enter valid OTP");
        }
        // console.log(validOTP);
    })
    const verifyOTP = () =>{
        setvalidateOTP(true);
    }
        return (
                <div className="otpdiv" >
                    <span className="otp" >Enter OTP</span>
                    <input className="input" type="email" value={OTP} onChange={typeOTP} required/>
                    <button className="button" onClick={verifyOTP}>Verify</button>
                    {msg && <div className="message">{msg}</div>}
                </div>
            
        )
}
const mapStateToProps = state => {
    console.log("dsnjsd",state);
    return {
      email: state.email
    };
  };    
export const OtpPageContainer = connect( mapStateToProps)(OtpPage);