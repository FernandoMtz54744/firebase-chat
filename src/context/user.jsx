import { createContext, useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, googleProvider } from "../services/firebase";

//Creando el context del usuario
const UserContext = createContext({
    user: null,
    loading:true,
    error: undefined,
    login: ()=>{},
    logout: ()=>{}
});

//Creando el provider del usuario
export const UserProvider = ({children}) =>{
    const [user, loading, error] = useAuthState(auth);

    const login = async ()=>{
        await auth.signInWithPopup(googleProvider);
    }

    const logout = async ()=>{    
        await auth.signOut();
    }

    return( 
        <UserContext.Provider value={{user, loading, error, login, logout}}>
            {children}
        </UserContext.Provider>
    )
}


//Creando el manejador de context
export const useUser = () => useContext(UserContext)