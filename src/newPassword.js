import React, { useState } from "react";

const NewPassword = () => {
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
      <label  className="loginLabel">
        new Password
        <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <button className="loginSubmit" type="submit">Save</button>
      <button className="signupButton" onClick={handleSignup}>Log In</button>
      <button className="resetPasswordButton" onClick={handleResetPassword}>Sign Up</button>
    </form>
  );
};
export default NewPassword;
