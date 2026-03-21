import { createContext, useContext, useState } from "react";
import { User } from "../types/user";
import { supabase } from "../services/supabaseClient";
import { Alert } from "react-native";


type AuthContextType = {
    user:  User;
    isAllowed: boolean;
    register: (email: string, password: string)=>Promise<void>;
    login: (email: string, password: string)=>Promise<void>;
    logout: ()=>void;
}
// 1. Definir el contexto
const AuthContext = createContext<AuthContextType | null>(null)

//2. Utilizar el contexto: Hook Personalizado 
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error ('useAuth debe usarse dentro de AuthProvider');
    return (context);
};
//3. Definicion de Context Provider 
export const AuthProvider = ({children}: {children: React.ReactNode} ) => {
    const [user, setUser] = useState<User>(null); 
    const [isAllowed, setIsAllowed] = useState<boolean>(false);

    const register = async (email: string, password: string) => {
       const {data, error} = await supabase.auth.signUp({
        email,
        password
       });
       console.log("res data: ", data)
    }
    const login = async (email: string, password: string) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email, 
            password
        });
        if (error) {
            Alert.alert("Error al iniciar sesion", error.message);
        };
       console.log("res data: ", data)
    };
    const logout = () =>{
        setUser(null);
        setIsAllowed(false);
    };

    return (
        <AuthContext.Provider value={{user, isAllowed, register, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
