import { useState, createContext, useContext } from "react";

const SessionContext = createContext();

export const useSession =()=>useContext(SessionContext);

export const SessionProvider = ({children})=>{
    const initialUser = (() => {
        try {
            const raw = sessionStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        } catch (err) {
            console.error("Failed to parse stored user", err);
            return null;
        }
    })();

    const [user, setUser] = useState(initialUser);
    const [isLoggedIn, setIsLoggedIn] = useState(!!initialUser);
    const loading = false;

    const login = (userData)=>{
        setIsLoggedIn(true);
        setUser(userData);
        sessionStorage.setItem("user",JSON.stringify(userData));

    }
    const logout = (data)=>{
        if(data){
        setIsLoggedIn(false);
        setUser(null);
        sessionStorage.removeItem("user");
        }
    }
    return (
        <SessionContext.Provider 
        value={{isLoggedIn,loading, user, login, logout}}>
            {children}
        </SessionContext.Provider>
    )
};