import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import QRScreen from "../screens/QRScreen";
import ProfileScreen from "../screens/ProfileScreen";

export type TabsParamList = {
    Home: undefined;
    // QR: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#4F46E5',
                tabBarInactiveTintColor: '#94A3B8',
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopColor: '#E2E8F0',
                    paddingBottom: 6,
                    paddingTop: 6,
                    height: 60,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Biblioteca',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="library-books" size={size} color={color} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="QR"
                component={QRScreen}
                options={{
                    title: 'Código QR',
                    headerShown: true,
                    headerTitleStyle: { fontWeight: '600' },
                    tabBarLabel: 'QR',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="qr-code" size={size} color={color} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Perfil',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
