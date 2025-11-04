import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function App() {
   const [user, setUser] = useState(null);
   const [error, setError] = useState('');

   useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try{
          const response = await axios.get('/api/users/me', {
            headers: { Authorization: `Bearer ${token}` }
          })
          setUser(response.data);

        } catch (err){
          setError("Failed to fetch user data", err);
          localStorage.removeItem('token');
        }
      }
    };
    fetchUser();
   }, [])

  return (
     <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

     </Router>
  )
}

export default App
