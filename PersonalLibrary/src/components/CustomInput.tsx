import { TextInput, View, Text, StyleSheet } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function CustomInput (){

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
                    placeholder={"email"}
                    value={""}
                    onChangeText={()=>{}}
                />
                <Ionicons name={"eye"}  size={20} />
            </View>
            <Text>*Campo Requerido</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper:{
        marginBottom:10,
    },
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
    }
});