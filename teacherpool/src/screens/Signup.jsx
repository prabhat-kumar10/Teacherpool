import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../styles/Signupstyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Signupphoto from "../assets/Signupphoto.svg";

const Signup = () => {
  const [fullname, setfullname] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const emailVarification = (val) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword){
      alert("Password did not match!");
    }
    else if (password.length < 8 || password.length > 15){
      alert("Password length must be between 8 to 15!");
    }
    else if (phone.length !== 10) {
      alert("Phone number must be of 10 digits!");
    }
    else if (emailVarification(email) === false) {
      alert("Incorrect email!");
    }
    else {
      try {
        const response = await axios.post("https://teacherpool-u1m9.onrender.com/signup", {
          fullname,
          phone,
          email,
          password,
        });
        console.log(response.data.email);
        alert("Signed Up Successfully! Login now");
        navigate("/login");
      } catch (error) {
        alert("Sign up error");
        console.log("Sign up error", error);
      }
    }
    setemail("");
    setpassword("");
    setConfirmPassword("");
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
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
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

      <Footer />
    </>
  );
};

export default Signup;
