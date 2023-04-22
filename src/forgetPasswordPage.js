import React, { useState } from "react";
import { urlPath } from "./config";
import { globalValues } from "./globalValues";


const ForgetPassword = ({onLogin, onSignup , onSuccess}) => {
  const [email , setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [retrySubmit, setRetrySubmit] = useState('get otp');

  

  const handleResetPassword = (event) => {

    setRetrySubmit('resend otp');
    const url =  urlPath + "otpRequest";
    const data = {email};
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonData => {
      if(jsonData.success)
      {
        alert("check your email for otp");
        globalValues = email;
      }
      else
      {
        alert("oops something went wrong");
      }
    })
    .catch(error => console.error(error));
    event.preventDefault();
  };

  const verifyOtp = (event) => {

    const url = urlPath + "validateotp";
    const data = {email,otp};
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(jsonData => {
      if(jsonData.success)
      {
        onSuccess();
      }
      else
      {
        alert("wrong otp");
      }
    })
    .catch(error => console.error(error));
    event.preventDefault();
  };

  return (
    <form className="loginText">
      <label  className="loginLabel">
        Email:
        <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label className="loginLabel">
        Otp:
        <input
          type="text"
          value={otp}
          onChange={(event) => setOtp(event.target.value)}
        />
      </label>
      <button className="loginSubmit" type='submit'  onClick={handleResetPassword}>{retrySubmit}</button>
      <button className="signupButton" onClick={()=>onSignup}>Sign Up</button>
      <button className="resetPasswordButton" onClick={()=>onLogin} >Log In</button>
      <button className="loginSubmit" type="submit" onClick={verifyOtp}>submit</button>
    </form>
  );
};

export default ForgetPassword;
