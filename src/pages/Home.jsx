import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import UploadForm from '../components/UploadForm';
import ImageGallery from '../components/ImageGallery';
import { AuthContext } from '../context/AuthContext.jsx';
import { useContext } from 'react';

export default function Home() {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-4xl mx-auto flex flex-col">
            <div> <Navbar /> </div>
            <p>Hello {user && user.email}</p>
            <div> <UploadForm /> </div>
            <div> <ImageGallery /> </div>
        </div>
    );
};
