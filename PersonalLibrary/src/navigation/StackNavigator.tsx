import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";

export type RootStackParamsList = {

};

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function StackNavigator() {
    return(
        <Stack.Navigator initialRouteName={'Login'}>
            <Stack.Screen name= "Login" component={LoginScreen} />
        </Stack.Navigator>
    );
}