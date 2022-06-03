import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileType, setProfileType] = useState("");

  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handlePassword = (e) => setPassword(e.target.value);
  const handleUsername = (e) => setUsername(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleProfileType = (e) => setProfileType(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password, email, profileType };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, body)
      .then(() => {
        if (profileType === "artist") {
          navigate("/login");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => {
        setErrorMessage(err.response.data.errorMessage);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsername}
        />

        <label htmlFor="email">Email</label>
        <input type="text" name="email" value={email} onChange={handleEmail} />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <label htmlFor="client">Client</label>
        <input
          type="radio"
          name="profileType"
          value="client"
          onChange={handleProfileType}
        />

        <label htmlFor="artist">Artist</label>
        <input
          type="radio"
          name="profileType"
          value="artist"
          onChange={handleProfileType}
        />

        <button type="submit">Sign Up</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <p>Already have an account?</p>
      <Link to="/login"> Login</Link>
    </div>
  );
}

export default SignupPage;
