import { useState } from "react";
import { db, storage } from "../firebase/config";
import { v4 as uuidv4 } from "uuid";
import { uploadBytesResumable } from "firebase/storage";
import { ref } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

export default function UseStorage() {
    const { user } = useContext(AuthContext);

    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    const startUpload = (file) => {
        if(!file){
            return;
        }

        const fileId = uuidv4()
        const formatFile = file.type.split('/')[1];
        console.log(formatFile)

        const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
        const uploadTask = uploadBytesResumable(storageRef, file); 

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
        }, (error) => {
            setError(error);
            }, async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setUrl(downloadURL);
                setProgress(progress);

                //save to firestore
                await addDoc(collection(db, "images"), {
                    imageUrl: downloadURL,
                    createAt: new Date(),
                    userEmail: user.email
            })            
        });
    }

    return {
        progress, error, url, startUpload
    }

}