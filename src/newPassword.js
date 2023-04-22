import React, { useContext, useState } from "react";
import { urlPath } from "./config";
import { globalValues } from "./globalValues";


const NewPassword = ({onLogin,onSignup,onSuccess}) => {
  const [newPassword, setPassword] = useState("");

  const handleResetPassword = (event) => {
    var email = globalValues;
    const url =  urlPath + "newpassword";
    const data = {email,newPassword};
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
          alert("password changed successfully")
      }
      else
      {
        alert("oops something went wrong");
      }
    })
    .catch(error => console.error(error));
    event.preventDefault();
  };

  return (
    <form className="loginText">
      <label  className="loginLabel">
        new Password
        <input
            type="text"
            value={newPassword}
            onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button className="loginSubmit" type="submit" onClick={handleResetPassword}>Save</button>
      <button className="signupButton" onClick={()=>onLogin()}>Log In</button>
      <button className="resetPasswordButton" onClick={()=>onSignup()}>Sign Up</button>
    </form>
  );
};
export default NewPassword;
