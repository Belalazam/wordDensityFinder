import React, { useState } from "react";
import { urlPath } from "./config";

const LoginPage = ({onSignup,onForget,onSuccess}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [ans, setAns] = useState({});

  const handleLogin = (event) => {
    const data = { username , password };
    const url = urlPath + 'loginuser'
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
        alert("Invalid Credentials");
      }
    })
    .catch(error => console.error(error));
    event.preventDefault();
  };
  return (
    <form className="loginText">
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
      <button className="loginSubmit" type="submit" onClick={handleLogin}>Log In</button>
      <button className="signupButton" onClick={()=>onSignup()}>Sign Up</button>
      <button className="resetPasswordButton" onClick={()=>onForget()}>Forgot Password?</button>
    </form>
  );
};

export default LoginPage;
