import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/Signupstyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Signupphoto from "../assets/Signupphoto.svg";

const Signup = () => {
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        fullname,
        phone,
        email,
        password,
      });
      console.log(response.data.email);
      alert("Signed Up Successfully");
      navigate("/login");
    } catch (error) {
      alert("Sign up error");
      console.log("Sign up error", error);
    }
    setemail("");
    setpassword("");
    setfullname("");
    setphone("");
  };

  return (
    <>
      <NavBar />
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h1>Welcome to Teacher Pool</h1>
          <h3 className="signup-title">Sign Up</h3>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Full name"
              name="fullname"
              value={fullname}
              onChange={(e) => setfullname(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phone}
              name="phone"
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              name="email"
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
        <img src={Signupphoto} alt="Signupphoto" className="Signupphoto" />
      </div>
    </>
  );
};

export default Signup;
