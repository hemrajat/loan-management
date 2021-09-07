import React, { useState,useEffect }  from 'react';
import {Link, BrowserRouter as Router} from 'react-router-dom';
import LoanList from "./../LoanList/LoanList.jsx";
import { connect } from 'react-redux';
import "./Dashboard.css"
export default function Dashboard(props){
    const[loans,setloans] = useState([]);
    const[msg,setmsg] = useState('');
    useEffect(()=>{
            const url = '/dashboard';
            const Email = props.email || localStorage.getItem('email');
            const data = {email : Email};
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
                setloans(data.loans);
                setmsg(data.message);
                });
        },[])
        return (
                <div className="dashboard">
                        <LoanList listOfLoan={loans}/>
                        <div className="createloanbox">
                                <Link className="createloanlink" to="/createloan">Creat Loan</Link>
                        </div>
                {msg&& <div>{msg}</div>}
                </div>
        )
}
const mapStateToProps = state => {
        console.log("dsnjsd",state);
        return {
          email: state.email
        };
      };    
export const DashboardContainer = connect( mapStateToProps)(Dashboard);