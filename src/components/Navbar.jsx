import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function Navbar()
{
    // Access the user, logOut, and loading state from the AuthContext
    const { user, logOut, loading } = useContext(AuthContext);

    // Use the useNavigate hook to programmatically navigate between pages
    const navigate = useNavigate();

    // Handle user logout
    const handleSignOut = () => {
        logOut()
        .then(() => {
            console.log("User logged out successfully");
            navigate("/signin"); // Redirect to the login page after logout
        })
        .catch((error) => console.error(error));
    };

    return <div>
        <div className="navbar bg-base-100 flex justify-between">
            <a className="btn btn-ghost text-xl">Galerry pro</a>
            <button onClick={() => handleSignOut()}>Logout</button>
        </div>
    </div>
}