import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import TabsNavigator from './TabsNavigator';
import BookDetailScreen from '../screens/BookDetailScreen';
import AddEditBookScreen from '../screens/AddEditBookScreen';
import PhotoAlbumScreen from '../screens/PhotoAlbumScreen';
import ExportImportScreen from '../screens/ExportImportScreen';

export type RootStackParamList = {
    Login: undefined;
    Tabs: { email?: string };
    BookDetail: { bookId: string };
    AddEditBook: { bookId?: string } | undefined;
    PhotoAlbum: { bookTitle: string; photos?: string[] };
    ExportImport: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='Login'
            screenOptions={{
                headerShown: true,
                headerTintColor: '#4F46E5',
                headerTitleStyle: { fontWeight: '600' },
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'Inicio de Sesión', headerShown: false }}
            />
            <Stack.Screen
                name="Tabs"
                component={TabsNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BookDetail"
                component={BookDetailScreen}
                options={{ title: 'Detalle del Libro' }}
            />
            <Stack.Screen
                name="AddEditBook"
                component={AddEditBookScreen}
                options={({ route }) => ({
                    title: route.params?.bookId ? 'Editar Libro' : 'Nuevo Libro',
                })}
            />
            <Stack.Screen
                name="PhotoAlbum"
                component={PhotoAlbumScreen}
                options={{ title: 'Álbum de Fotos' }}
            />
            <Stack.Screen
                name="ExportImport"
                component={ExportImportScreen}
                options={{ title: 'Exportar / Importar' }}
            />
        </Stack.Navigator>
    );
}
