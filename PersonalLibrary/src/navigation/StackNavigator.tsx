import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

export type RootStackParamList = {
    Login: undefined,
    Home: {email: string},
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName='Login' 
        screenOptions={{headerShown: true}}
        >
            <Stack.Screen 
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen 
                name="Login" 
                component={LoginScreen} 
                options={{title:'Inicio de Sesion'}}
            />
            
        </Stack.Navigator>
    );
}