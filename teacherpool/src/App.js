import React from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from './screens/Login';
import Signup from './screens/Signup';
import { AuthProvider } from './AuthContext';
import Jobopenings from './screens/Jobopenings';
import Blogs from './screens/Blogs';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobopenings" element={<Jobopenings />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
      
  );
}

export default App;




