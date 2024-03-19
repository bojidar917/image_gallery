import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Protected({children}) {
    const { loading, user } = useContext(AuthContext);

    if (loading) {
      return <span className="loading loading-dots loading-lg"></span>;
    }
  
    if (user) {
      return children;
    }
  
    return <Navigate to="/signin" />;
}