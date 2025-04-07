import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API}/me`, {
          withCredentials: true,
        });
        setAuth(true);
      } catch {
        setAuth(false);
      }
    };
    checkAuth();
  }, []);

  if (auth === null) return <div className="p-4">Loading...</div>;
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
