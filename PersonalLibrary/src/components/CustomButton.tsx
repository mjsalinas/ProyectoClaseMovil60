import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../theme/colors";

interface CustomButtonProps {
    title: string;
    onClick: () => void;
    variant?: "primary" | "secondary";
}

export default function CustomButton({
    title,
    onClick,
    variant = "primary"
}: CustomButtonProps) {
    const isPrimary = variant === "primary";

    return (
        <TouchableOpacity
            onPress={onClick}
            style={[styles.container, isPrimary ? styles.primary : styles.secondary]}
            activeOpacity={0.8}
        >
            <Text style={[styles.text, isPrimary ? styles.primaryText : styles.secondaryText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        alignItems: 'center',
        width: "85%",
        borderRadius: 14,
    },
    primary: {
        backgroundColor: colors.primary,
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
        elevation: 4,
    },
    secondary: {
        backgroundColor: colors.white,
        borderWidth: 1.5,
        borderColor: colors.border,
    },
    text: {
        fontSize: 16,
        fontWeight: "600",
    },
    primaryText: {
        color: colors.white,
    },
    secondaryText: {
        color: colors.textSecondary,
    },
});
