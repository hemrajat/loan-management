import React, { useState }  from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import "./Createloan.css"
export default function Createloan (props){
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [num,setNum] = useState('');
    const [email,setEmail] = useState('');
    const [amount,setAmount] = useState('');
    const [sDate,setSDate] = useState('');
    const [eDate,setEDate] = useState('');
    const [emi,setEmi] = useState('');
    let history = useHistory();
    const submit = () =>{
        const loanDetail = {
            name:name,
            address:address,
            number:num,
            email:email,
            amount:amount,
            sDate:sDate,
            eDate:eDate,
            emi:emi
        }
        const Email = props.email || localStorage.getItem('email');
        const data = {email:Email,loanDetail:loanDetail};
            const url = '/createloan';
            fetch(url, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then((res) => res.json())
                .then((data) => {   
                console.log("typed email", typeof data.validOtp);
                });
        history.push("/dashboard");
    }

        return (
                <div className="loandetailbox">
                    <div className="row">
                       <div className="item"> Loan Applicant Name : </div>
                        <div className="item"><input type="text" value={name} onChange={(event)=>setName(event.target.value) } required/></div>
                    </div>
                    <div className="row">
                       <div className="item"> Address : </div>
                      <div className="item">  <input type="text" value={address} onChange={(event)=>setAddress(event.target.value)}  required/></div>
                    </div>
                    <div className="row">
                       <div className="item"> Contact Number : </div>
                       <div className="item"> <input type="Number" value={num} onChange={(event)=>setNum(event.target.value)} required /></div>
                    </div>
                    <div className="row">
                       <div className="item"> Email address : </div>
                       <div className="item"> <input type="email" value={email} onChange={(event)=>setEmail(event.target.value)}  required/></div>
                    </div>
                    <div className="row">
                       <div className="item"> Loan amount : </div>
                       <div className="item"> <input type="Number" value={amount} onChange={(event)=>setAmount(event.target.value)}  required/></div>
                    </div>
                    <div className="row">
                        <div className="item">Loan Start Date : </div>
                        <div className="item"><input type="date" value={sDate} onChange={(event)=>setSDate(event.target.value)}  required/></div>
                    </div>
                    <div className="row">
                       <div className="item"> Loan expiary date : </div>
                       <div className="item"> <input type="date" value={eDate} onChange={(event)=>setEDate(event.target.value)}  required/></div>
                    </div>
                    <div className="row">
                       <div className="item"> Monthaly Installment(EMI) : </div>
                       <div className="item"> <input type="Number" value={emi} onChange={(event)=>setEmi(event.target.value)}  required/></div>
                    </div>
                    <div className="row">
                     <button className="buttonSubmit"onClick={submit}>Submit</button>
                    </div>
                </div>
            
        )
}
const mapStateToProps = state => {
    console.log("dsnjsd",state);
    return {
      email: state.email
    };
  };    
export const CreateloanContainer = connect( mapStateToProps)(Createloan);