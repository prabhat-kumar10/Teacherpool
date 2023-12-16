import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import "../styles/Loginstyle.css"
import NavBar from "../components/NavBar";
import axios from "axios";
import { useAuth } from '../AuthContext';
import Loginphoto from '../photos/Loginphoto.svg'



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allEntry, setallEntry] = useState([]);
    const { login } = useAuth();

    const navigate=useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newEntry={email:email,password:password};
        setallEntry([...allEntry,newEntry]);

        try{
            const response= await axios.post('http://localhost:8000/login',{email,password});

            const {success,message,user}=response.data;
            // console.log(response.data);
            
            if(message==="Login Successful"){
                console.log("Login done successfully");
                alert("Login Succesfull");
                login(user);
                navigate("/");
            }
            else
            {
                console.log(message);
            }
        }
        catch(error){
            console.log('Login error',error);
        }
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <NavBar/>
            <div className="Logincontainer">
                <img src={Loginphoto} alt="loginphoto" className="loginphoto"/>
                <form onSubmit={handleSubmit} action="/signup" method="POST">
                    <h1>Welcome to Teacher Pool</h1>
                    <h3>Sign In</h3>

                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <p>
                        Not signed up yet? 
                        <Link to='/signup'>SignUp</Link>
                    </p>
                </form>
            </div>
         </>
    );
};

export default Login;
