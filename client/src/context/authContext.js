import axios from "axios"
import { useState, useEffect } from 'react';
import { createContext } from "react"





export const AuthContext = createContext()


export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("email") || null))

    const login = async(inputs) => {
        const res = await axios.post("/auth/login", inputs);
        setCurrentUser(res.data)
    }
    const logout = async(inputs) => {
        await axios.post("/auth/logout");
        setCurrentUser(null)
    }

    useEffect(()=>{
        localStorage.setItem("email", JSON.stringify(currentUser))
    }, [currentUser])


    return (
        <AuthContext.Provider value={{currentUser, login, logout}}>{children}</AuthContext.Provider>
    )
}