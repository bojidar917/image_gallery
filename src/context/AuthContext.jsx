// AuthProvider.js
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {auth} from "../firebase/config";
  
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // const createUser = (email, password) => {
    //     setLoading(true);
    //     return createUserWithEmailAndPassword(auth, email, password);
    // };

    // const loginUser = (email, password) => {
    //     setLoading(true);
    //     return signInWithEmailAndPassword(auth, email, password);
    // };

    // const logOut = () => {
    //     setLoading(true);
    //     return signOut(auth);
    // };

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setLoading(false);
        } catch (error) {
            // consider logging errors 
            setLoading(false);
            setError(error);
            throw error;
        }
        // set loading into finally block
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
        // set loading into finally block
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await signOut(auth);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
        // set loading into finally block
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
        });

        return () => {
        unsubscribe();
        };
    }, []);

    const authValue = {
        createUser,
        user,
        loginUser,
        logOut,
        loading,
        error
    };

    return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;