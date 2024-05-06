import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function UseFirestore(collectionName) {
    const [docs, setDocs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // define let unsubscribe in outer scope

    useEffect(() => {
        const getData = async () => {
            try {
                const q = query(collection(db, collectionName), orderBy("createAt", "desc"));
                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const images = [];
                    querySnapshot.forEach((doc) => {
                        const imageUrl = doc.data().imageUrl;
                        const createAt = doc.data().createAt.toDate();
                        const userEmail = doc.data().userEmail;
                        console.log(doc.data().userEmail)
                        images.push({imageUrl, createAt, userEmail});
                    });
                    setDocs(images);
                    setIsLoading(false);
                });
            } catch (err) {
                console.log(err);
                setIsLoading(false);
            }
        }
        getData();
        // unsubscribe is undefined here
        return () => unsubscribe && unsubscribe()
    }, [collectionName])

    return {
        docs, isLoading
    }
}