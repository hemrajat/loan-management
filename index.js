require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")));
mongoose.connect("mongodb+srv://admin-hemraj:mongodb@cluster0.mjw1y.mongodb.net/loanManagement",{ useNewUrlParser: true , useUnifiedTopology: true});
const loanSchema = {
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  data:{
    name: String,
    address: String,
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      unique: true
    },
    contactNumber: Number,
    loanAmount: Number,
    loanStartDate: Date,
    loanExpirayDate: Date,
    monthlyInstallment: Number
  }
};
const userSchema = {
  email: {
    type: String,
    required: true,
    match: /.+\@.+\..+/,
    unique: true
  },
  loans: [],
  message: String
  // approvalResponse: [loanSchema]
};
const otpSchema = {
  email: String,
  otp: String,
}

const pendingLoansDataSchema = {
  emailOfUser: String,
  name: String,
  address: String,
  email: String,
  contactNumber: String,
  loanAmount: String,
  loanStartDate: String,
  loanExpirayDate: String,
  monthlyInstallment: String
};

const Users = mongoose.model("User",userSchema);
const Otps = mongoose.model("otp",otpSchema);
const pendingLoansData = mongoose.model("pendingloandata",pendingLoansDataSchema);

function mailUser(mailId){
  let toMail = mailId;
  let fromMail = "noreplytohemraj@gmail.com";
  let subject = "Loan Management: status";
  let text = "Your loan approval is under process: \n";
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromMail,
      pass: "Catisflexy@360"
    }
  });
  let mailOption = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOption,function(err,res){
    if(!err){
      console.log(res);
    }else{
      console.log(err);
    }
  });
}
function mailOtp(otp,mailId){
  let toMail = mailId;
  let fromMail = "noreplytohemraj@gmail.com";
  let subject = "OTP for Loan Management";
  let text = "Your otp for loan management is: \n"+ otp;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromMail,
      pass: "Catisflexy@360"
    }
  });
  let mailOption = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOption,function(err,res){
    if(!err){
      console.log(res);
    }else{
      console.log(err);
    }
  });
}
function mailApproval(email,loanId,data){
  let toMail = "contacthemrajjat@gmail.com";
  let fromMail = "noreplytohemraj@gmail.com";
  let subject = "Loan approval request";

  const linktoApprove = "http://localhost:3001/"+email+"/"+loanId +"/approved";
  const linktoReject = "http://localhost:3001/"+email+"/"+loanId +"/rejected";
 
                                      
  let text = "These are the loan details\nName  "+data.name
  +"\nAddress   "+data.address
  +"\nEmail   "+data.email
  +"\nContactNumber   "+data.contactNumber
  +"\nLoan amount   "+data.loanAmount
  +"\nLoan start date   "+data.loanStartDate
  +"\nLoan Expiry date  "+data.loanExpirayDate
  +"\nMonthly Installment(EMI)  "+data.monthlyInstallment
  +"\n\n\nClick on the link to approve : \n"+linktoApprove+"\n\n\n"+"Click on the link to reject : \n"+linktoReject;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromMail,
      pass: "Catisflexy@360"
    }
  });
  let mailOption = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOption,function(err,res){
    if(!err){
      console.log(res);
    }else{
      console.log(err);
    }
  });
}
function mailApprovalResponse(email,message){
  let toMail = email;
  let fromMail = "noreplytohemraj@gmail.com";
  let subject = "Loan approval : status";
  let text = "Your loan is : "+message+"\nPlease check into your account";
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromMail,
      pass: "Catisflexy@360"
    }
  });
  let mailOption = {
    from: fromMail,
    to: toMail,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOption,function(err,res){
    if(!err){
      console.log(res);
    }else{
      console.log(err);
    }
  });
}

function makeLoanList(user){
  let loans = []
  
  user.loans.forEach(element => {
    const singleLoan = {
      name: "",
      address: "",
      contactNumber: "",
      contactEmail: "",
      amount: "",
      sDate: "",
      eDate: "",
      emi: "",
    };
    singleLoan.contactEmail = element.email;
    singleLoan.address = element.address;
    singleLoan.contactNumber = element.contactNumber;
    singleLoan.name = element.name;
    singleLoan.amount = element.loanAmount;
    singleLoan.sDate = element.loanStartDate;
    singleLoan.eDate = element.loanExpirayDate;
    singleLoan.emi = element.monthlyInstallment;
    // console.log(singleLoan);
    loans.push(singleLoan);
    // console.log(loans);
  });
  // console.log(loans)
  return loans;
}



app.post("/login",function(req,res){
  // console.log(req.body.email);
  const mailId = req.body.email;
  const generateOtp = Math.floor(Math.random()*1000000).toString();
  // console.log(generateOtp);
  Otps.findOne({email:mailId},async function(err,otpFound){
    if(!err){
      if(!otpFound){
        const otp = new Otps({
          email: mailId,
          otp: generateOtp
        });
        await otp.save();
      }else{
        let doc = await Otps.findOneAndUpdate({email:mailId},{otp:generateOtp});
      }
    }
    mailOtp(generateOtp,mailId);

    res.json({email:mailId});
  });
});

app.post("/otp",function(req,res){
  const mailId = req.body.email;
  const otpEntered = req.body.otp;
  // console.log(mailId,otpEntered);

  Otps.findOne({email:mailId},function(err,otpFound){
    if(!err && otpEntered && otpFound){
      if(otpFound.otp===otpEntered){
        Otps.deleteOne({email:mailId}).then(function(){
            console.log("Data deleted"); 
            res.json({validOtp:true});
        }).catch(function(error){
            console.log(error);
        });
        
      }else{
        res.json({validOtp:false});
      }
    }
  });
});

app.post("/dashboard",function(req,res){
  const mailId = req.body.email;
  const resData = {
    loans: [],
    message: ""
  };
  Users.findOne({email:mailId},async function(err,user){
    if(!err){
      if(user){
        resData.loans = makeLoanList(user);
        resData.message = user.message;
        if(user.message==="approved"||user.message==="rejected"){
          await Users.findOneAndUpdate({email:mailId},{message:""});
        }
        // console.log(resData);
        res.json(resData);
      }
      else{
        const user = new Users({
          email:mailId,
          loans:[],
          message: ""
        });
        await user.save();
        res.redirect("/dashboard");
      }
    }
    else{
      console.log(err);
    }
  });
});

app.post("/createloan",async function(req,res){
  const email = req.body.email;
  const loanDetail = req.body.loanDetail;
  pendingLoansData.findOne({emailOfUser:email},async function(err,loan){
    if(!err){
      if(!loan){
        const newPendingLoan = new pendingLoansData({
          emailOfUser: email,
          name: loanDetail.name,
          address: loanDetail.address,
          email: loanDetail.email,
          contactNumber: loanDetail.number,
          loanAmount: loanDetail.amount,
          loanStartDate: loanDetail.sDate,
          loanExpirayDate: loanDetail.eDate,
          monthlyInstallment: loanDetail.emi
        });
        await newPendingLoan.save();
        pendingLoansData.findOne({emailOfUser:email},async function(err,loanFound){
          if(!err){
            mailApproval(email,loanFound._id,loanFound);
            mailUser(email);
            res.redirect("/createloan");
          }
        });
      }
      else{
        res.json({});
      }
    }
  });
});

app.get("/:email/:id/:status",function(req,res){
  const id = req.params.id;
  const mailId = req.params.email;
  const status = req.params.status;
  // console.log(status);
  if(status==="approved"){
    pendingLoansData.find({_id:id},function(err,pendingLoan){
      // console.log(pendingLoan);
      Users.findOneAndUpdate({email:mailId},{$set:{message:"approved"}, $push: { loans: pendingLoan}},
        function (error, success) {
          if (error) {
            console.log(error);
          } else {
            pendingLoansData.deleteOne({_id:id},function(err){
              if(err){
                console.log(err);
              }
            })
          }
      });
    })
    mailApprovalResponse(mailId,"approved")
    res.send("<h1>successfully approved</h1>");
  }
  else{
    pendingLoansData.deleteOne({_id:id},function(err){
      if(!err){
        // console.log("Successfully delete");
        Users.findOneAndUpdate({email:mailId},{$set:{message:"rejected"}},function(err,success){
          if(err){
            console.log(err);
          }
        });
        mailApprovalResponse(mailId,"rejected");
        res.send("<h1>Successfully rejected</h1>");
      }
    })
  }
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT,function(){
  console.log(`Server started successfully at port ${PORT}`);
})
