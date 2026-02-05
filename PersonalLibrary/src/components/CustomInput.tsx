import { TextInput, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

type Props = {
    placeholder: string,
    onChange: () => void;
    value: string;
    typeInput : 'password' | 'email' | 'numeric' | 'text';
    
}
export default function CustomInput ({placeholder, onChange, value, typeInput}:Props){
//uso de variables en el estado local
        //sintaxis:
        //[nombreDeVariable, funcion] = useState(<valorInicial>);
    const [isSecureText, setIsSecureText] = useState(typeInput === 'password'); 

    return(
        //wrapper
        <View style={styles.wrapper}>
            {/* //inputContainer */}
            <View style={styles.inputContainer}>
                <MaterialIcons 
                    name={"lock"}
                    size={20}
                    color={"#000000"}
                />
                <TextInput 
                    placeholder={placeholder}
                    value={value} 
                    onChangeText={onChange}
                    secureTextEntry={isSecureText}
                />
                <TouchableOpacity
                onPress={
                    ()=>{

                    }
                }>
                    <Ionicons name={"eye"}  size={20} />
                </TouchableOpacity>
            
            </View>
            <Text>*Campo Requerido</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        marginBottom:10,
        width: "100%",
        paddingHorizontal: 25,
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 13,
    }
});