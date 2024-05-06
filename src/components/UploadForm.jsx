import React from 'react';
import { useState } from 'react';
import UseStorage from '../context/UseStorage'

export default function UploadForm() {
    const[selectedFile, setSlectedFile] = useState(null);
    const {startUpload, progress} = UseStorage();
    
    const handleFileChange = (e) => {
        // make sure e.tartget.files exists like e?.target?.files
        if(e.target.files && e.target.files[0]){
            setSlectedFile(e.target.files[0]);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(selectedFile){
            //start uploading an image
            startUpload(selectedFile)
        }
        // Do we always need to set this to null
        setSlectedFile(null);
        
    }

    return (
        <div className='text-center mt-10'>
            <form onSubmit={handleSubmit} className='flex items-center flex-col gap-8'>
                <input 
                    onChange={handleFileChange}
                    type='file' 
                    className='file-input file-input-bordered w-full max-w-xs'/>
                <button 
                    type="submit" 
                    className={progress ? 'btn gap-3 bg-slate-800 loading' : 'btn gap-3 bg-slate-800'}
                    disabled={!selectedFile}
                >
                        Upload 🚀</button>
            </form>
        </div>
    )
}