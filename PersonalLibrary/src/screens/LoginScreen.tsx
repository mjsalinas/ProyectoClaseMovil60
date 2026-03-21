import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth} from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";
import { colors } from "../theme/colors";
import { User } from "../types/user";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User>(null);
  const { login } = useAuth();

  const handleOnLogin = () => {
       login(email, password);
        // navigation.navigate("Tabs", { screen: "Home" });
  };

  const handleOnRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <View style={styles.headerSection}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="auto-stories" size={52} color={colors.white} />
          </View>
          <Text style={styles.appName}>BookLog</Text>
          <Text style={styles.appTagline}>Tu biblioteca personal</Text>
        </View>

        <View style={styles.formSection}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{i18n.t("signIn")}</Text>
            <Text style={styles.cardSubtitle}>
              Ingresa tus credenciales para continuar
            </Text>

            <View style={styles.inputsContainer}>
              <CustomInput
                placeholder={i18n.t("enterEmail")}
                onChange={setEmail}
                value={email}
                typeInput={"email"}
              />
              <CustomInput
                placeholder={"Password"}
                onChange={setPassword}
                value={password}
                typeInput={"password"}
              />
            </View>

            <View style={styles.buttonsContainer}>
              <CustomButton title={"Iniciar Sesión"} onClick={handleOnLogin} />
              <CustomButton
                title={i18n.t("register")}
                onClick={handleOnRegister}
                variant={"secondary"}
              />
            </View>
          </View>

          <Text style={styles.footerText}>
            BookLog v1.0 - Tu historial de lectura
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scrollContent: {
     flexGrow: 2,
  },
  headerSection: {
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 70 : 50,
    paddingBottom: 36,
    backgroundColor: colors.primary,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.white,
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginTop: 6,
    fontWeight: "500",
  },
  formSection: {
    flex: 1,
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 32,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 24,
  },
  inputsContainer: {
    gap: 4,
  },
  buttonsContainer: {
    marginTop: 16,
    alignItems: "center",
    gap: 10,
  },
  footerText: {
    textAlign: "center",
    fontSize: 12,
    color: colors.textLight,
    marginTop: 24,
    marginBottom: 20,
  },
});
