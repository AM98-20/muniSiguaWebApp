import React from "react";
import { createContext, useEffect, useState } from "react";
import { setJWT } from "../api/axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});

    useEffect(() => {
        if (auth.accessToken) {
            setJWT(auth.accessToken);
        }
    }, [auth]);


    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;