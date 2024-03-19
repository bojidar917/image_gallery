import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { useContext } from 'react';

export default function Signin() {
    const { loginUser, loading, user, error } = useContext(AuthContext);
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
        loginUser(email, password)
        .then((result) => {
            console.log(result);
            navigate("/");
        })
        .catch((error) => {
            console.log(error.message); 
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
                        <p className="py-6">Signin to share photos to the world</p>
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
                            <button className="btn btn-primary">SignIn</button>
                            <Link to="/signup" className="link mt-3 text-center">Create new account</Link>
                            {error && (
                                <div role="alert" className="alert alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>{error.message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}