import React, { useState } from "react";
import { urlPath } from "./config";

const SignUpPage = ({onLogin,onForget,onSuccess}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email , setEmail]  = useState("");

  const handleSignup = (event) => {
    const url = urlPath + "signupuser";
    const data = {username,password,email};
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
        alert("signup successfully")
      }
      else
      {
        alert("email already exists");
      }
    })
    .catch(error => console.error(error));
    event.preventDefault();
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
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <label className="loginLabel">
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <button className="loginSubmit" type="submit" onClick={handleSignup}>Sign Up</button>
      <button className="signupButton" onClick={()=>onLogin()}>Log In</button>
      <button className="resetPasswordButton" onClick={()=>onForget()}>Forgot Password?</button>
    </form>
  );
};

export default SignUpPage;
