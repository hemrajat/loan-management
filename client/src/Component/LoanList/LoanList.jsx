import React  from 'react';
import './LoanList.css';

export default class LoanList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email:''
        }
    }
    
    render(){
       const listOfLoan = this.props?.listOfLoan || [];
        return (
               <div className="loanbox"> 
                  {listOfLoan.map(item=>(
                    <div className="loandetail">
                        <div className="row">Name: {item.name}</div>
                        <div className="row">Address: {item.address}</div>
                        <div className="row">Contact Number: {item.contactNumber}</div>
                        <div className="row">Email address: {item.contactEmail}</div>
                        <div className="row">Loan Amount : {item.amount}</div>
                        <div className="row">Start Date : {item.sDate}</div>
                        <div className="row">End Date : {item.eDate}</div>
                        <div className="row">EMI : {item.emi}</div>
                    </div>
                ))}
                {listOfLoan.length === 0 && <div className="noLoan"><div>No Loan</div></div>}
                </div>
        )
    }
}