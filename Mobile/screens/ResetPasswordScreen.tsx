"use client";

import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../App";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import { ENDPOINTS } from "../constants/api";

type ResetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ResetPassword"
>;

const { width, height } = Dimensions.get("window");

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isStrongPassword = (password: string) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please fill in all fields",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("The confirmed passwords don't match");
      Toast.show({
        type: "error",
        text1: "Password Error",
        text2: "Passwords do not match",
      });
      return;
    }

    if (!isStrongPassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long, include uppercase, lowercase, number, and symbol."
      );
      Toast.show({
        type: "error",
        text1: "Weak Password",
        text2: "Password must include uppercase, lowercase, number, and symbol",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(ENDPOINTS.RESET_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Your password updated successfully!",
      });

      navigation.navigate("Login");
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    } finally {
      setLoading(false);
      setNewPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: "/ResetPassword.gif" }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Reset Password</Text>

            {/* New Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="New Password"
                  placeholderTextColor="#e6ffe7"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#e6ffe7"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm your new password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Confirm Password"
                  placeholderTextColor="#e6ffe7"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showPassword}
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#e6ffe7"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Show Password Checkbox */}
            <TouchableOpacity
              style={styles.checkboxContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <View
                style={[
                  styles.checkbox,
                  showPassword && styles.checkboxChecked,
                ]}
              >
                {showPassword && (
                  <Ionicons name="checkmark" size={16} color="#fff" />
                )}
              </View>
              <Text style={styles.checkboxLabel}>Show Password</Text>
            </TouchableOpacity>

            {error ? <Text style={styles.errorMessage}>{error}</Text> : null}

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Updating..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  headerImage: {
    width: width * 0.6,
    height: height * 0.25,
    borderRadius: 15,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#023116",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "500",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#80a188",
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
  },
  eyeIcon: {
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#80a188",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: "#086803",
    borderColor: "#086d03",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#333",
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: "rgba(8, 109, 3, 0.977)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 45,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "rgba(8, 109, 3, 0.5)",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});

export default ResetPasswordScreen;
