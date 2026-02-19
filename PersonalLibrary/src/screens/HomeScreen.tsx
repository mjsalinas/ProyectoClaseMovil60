import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { TabsParamList } from "../navigation/TabsNavigator";

type Props = NativeStackScreenProps<TabsParamList, 'Home'>;

export default function HomeScreen(){
    //destructuring de parametro de ruta: sacando una propiedad de un objeto
    // const {email} = route.params

    return(
        <View>
            <Text>Bienvenido a home</Text>
        </View>
    );
}