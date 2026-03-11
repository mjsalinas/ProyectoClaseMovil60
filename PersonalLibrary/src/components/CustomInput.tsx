import { TextInput, View, Text, StyleSheet, TouchableOpacity, KeyboardTypeOptions } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { colors } from "../theme/colors";

type Props = {
    placeholder: string;
    onChange: (text: string) => void;
    value: string;
    typeInput?: 'password' | 'email' | 'number' | 'text';
}

export default function CustomInput({ placeholder, onChange, value, typeInput = "text" }: Props) {
    const [isSecureText, setIsSecureText] = useState(typeInput === 'password');
    const isPasswordField = typeInput === 'password';

    const icon: typeof MaterialIcons["name"] | undefined =
        typeInput === "email" ? "email" :
            typeInput === "password" ? "lock" : undefined;

    const keyboardType: KeyboardTypeOptions =
        typeInput === "email" ? "email-address" :
            typeInput === "number" ? "numeric" : "default";

    const getError = () => {
        if (value.length === 0) return undefined;
        if (typeInput === "email" && !value.includes('@'))
            return 'Correo Inválido';
        if (typeInput === "password" && value.length < 6)
            return 'La contraseña debe ser más fuerte';
    };

    const error = getError();

    return (
        <View style={styles.wrapper}>
            <View style={[
                styles.inputContainer,
                error && styles.inputError,
            ]}>
                {icon && (
                    <MaterialIcons
                        name={icon}
                        size={20}
                        color={colors.textLight}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.textLight}
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry={isSecureText}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                />
                {isPasswordField && (
                    <TouchableOpacity onPress={() => setIsSecureText(!isSecureText)}>
                        <Ionicons
                            name={isSecureText ? "eye" : "eye-off"}
                            size={20}
                            color={colors.textLight}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: colors.border,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 4,
        backgroundColor: colors.surfaceAlt,
    },
    inputError: {
        borderColor: colors.danger,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 12,
        fontSize: 15,
        color: colors.textPrimary,
    },
    errorText: {
        color: colors.danger,
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
        fontWeight: '500',
    },
});
