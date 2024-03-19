import React from 'react';
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth"
import { AuthContext } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';

export default function Signup() {
    const { createUser, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
  
    if (loading) {
      return (
        <span className="loading loading-dots loading-lg flex item-center mx-auto"></span>
      );
    }
  
    if (user) {
      navigate("/");
    }
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      createUser(email, password)
        .then((result) => {
          navigate("/");
          console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      e.target.reset();
    };

    return (
        <form onSubmit={handleFormSubmit}>
            <div className='hero min-h-screen bg-base-200'>
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">
                            Image Pro
                        </h1>
                        <p className="py-6">Signup to share photos to the world</p>
                    </div>
                    <div className='card sm:w-[30rem] shadow-2xl bg-base-100'>
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input name='email' type="text" placeholder='email' className='input input-bordered' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input name='password' type="text" placeholder='password' className='input input-bordered' />
                            </div>
                            <button className="btn btn-primary">SignUp</button>
                            <Link to="/signin" className="link mt-3 text-center">Already have an account? Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}