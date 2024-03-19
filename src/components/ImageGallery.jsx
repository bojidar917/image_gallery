import React from 'react';
import UseFirestore from '../context/UseFirestore';

export default function ImageGallery()
{
    const {docs: images, isLoading} = UseFirestore('images');
    console.log(images);

    if(isLoading)
    {
        return (
            <div>
                <progress className='progress w-56'></progress>
            </div>
        )
    }
 
 
    return (
        <div className='grid md:grid-cols-3 justify-center gap-10 mt-10 '>
           {images.map((image) => (
            <div key={image.imageUrl} className="card card-compact w-96 bg-base-100 shadow-xl">
                <figure className='max-h-96'>
                    <img src={image.imageUrl} />
                </figure>
                <div className="card-body">
                    <p>Upload by: {image.userEmail}</p>
                    <span>Created on: </span>
                </div>
             </div>
           ))}
        </div>
    )
}