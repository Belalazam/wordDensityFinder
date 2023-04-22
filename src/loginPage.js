import React, { useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // validate user credentials
    if (username === "validUsername" && password === "validPassword") {
      // store login credentials securely
      localStorage.setItem("isLoggedIn", true);
      // navigate to protected page
      history.push("/protected");
    } else {
      alert("Invalid username or password");
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();
    // navigate to signup page
    history.push("/signup");
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    // navigate to reset password page
    history.push("/reset-password");
  };

  return (
    <form className="loginText" onSubmit={handleLogin}>
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
      <button className="loginSubmit" type="submit">Log In</button>
      <button className="signupButton" onClick={handleSignup}>Sign Up</button>
      <button className="resetPasswordButton" onClick={handleResetPassword}>Forgot Password?</button>
    </form>
  );
};

export default LoginPage;
