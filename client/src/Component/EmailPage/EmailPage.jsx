import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import "./Email.css"
function EmailPage(props) {
  const [email, setEmail] = useState("");
  const [msg, setMSG] = useState("");
  let history = useHistory();
  const typeEmail = (event) => {
    setEmail(event.target.value);
  };
  const verifyEmali = () => {
    var re = /\S+@\S+\.\S+/;
    if (re.test(email)) {
      const data = { email: email };
      const url = "/login";
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("typed email", data);
        });
        const payload = {email:email}
        localStorage.setItem('email', email);
        props.dispatchVerifyEmail(payload);
      history.push("/otp");
    } else {
      setMSG("Enter valid Email");
    }
  };
  return (
    <div className="emailbox">
      <span className="email" >Enter your email</span>
      <input className="input" type="email" value={email} onChange={typeEmail} required />
      <button className="button" onClick={verifyEmali}>Verify</button>
      {msg && <div className="message">{msg}</div>}
    </div>
  );
};
const mapStateToProps = state => {
  console.log("dsnjsd",state);
  return {
    email: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatchVerifyEmail: (email) => dispatch({ type: 'SET_EMAIL' ,payload:email}),
  }
};
export const EmailPageContainer = connect( mapStateToProps, mapDispatchToProps)(EmailPage);
