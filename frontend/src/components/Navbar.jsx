import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = ({ user, setUser }) => {

  const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  }


  return (
     <nav className='bg-gray-900 p-4 '>
      <div className='container mx-auto flex justify-between items-center'>
        <Link to="/" className='text-white text-2xl font-bold'>MERN-Auth</Link>
      <div>
        {user ? (
          <button onClick={handleLogout} className='text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700'>
            Logout
          </button>
        ) : (
          <>
          <Link className='text-white mx-2 bg-blue-500 px-4 py-2 rounded hover:bg-blue-600' to="/login">Login</Link>
          <Link className='text-white mx-2 bg-gray-600 px-4 py-2 rounded hover:bg-gray-700' to="/register">Register</Link>
          </>
        )}
      </div>
     </div> 
   </nav>
  )
}

export default Navbar