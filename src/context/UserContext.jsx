import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";


const UserContext = createContext()

export const useUser = () => useContext(UserContext)

export const UserProvider = ({children}) => {

    const URL = import.meta.env.VITE_URL
    const assetsURL = import.meta.env.VITE_ASSETS_URL
    const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('user')) || {} )
    const [ token, setToken ] = useState(JSON.parse(localStorage.getItem('token')) || {})

    useEffect(() => {
        user ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem("user", JSON.stringify(user))
        token ? localStorage.setItem("token", JSON.stringify(token)) : localStorage.removeItem("token", JSON.stringify(token))
    }, [user, token])

    async function logIn(data){
        try {
            const response = await axios.post(`${URL}/login`, data)
            setUser(response.data.user)
            setToken(response.data.token)
            Swal.fire({
                icon: 'success',
                title: response.data.message
            }).then(res => {
                if(res.isConfirmed){
                    location.replace('/')
                }
            })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon:'error',
                title: error.response.data.message
            })
        }
    }

    function logOut(){
        setUser({})
        setToken({})
        location.reload()
    }

    return(
        <UserContext.Provider value={{user, token, logIn, assetsURL, logOut}}>
            {children}
        </UserContext.Provider>
    )

}