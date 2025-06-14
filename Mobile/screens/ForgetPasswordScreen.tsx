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

type ForgetPasswordScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "ForgetPassword"
>;

const { width, height } = Dimensions.get("window");

const ForgetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ForgetPasswordScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onLoginClick = () => {
    navigation.navigate("Login");
  };

  const handleSubmit = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter your email address",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/Verif/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Verification code sent to your email",
        });
        navigation.navigate("EnterCode");
      } else {
        setMessage("Error: " + result.message);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: result.message,
        });
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message);
        setMessage("Error: Unable to send reset email. Please try again.");
        Toast.show({
          type: "error",
          text1: "Network Error",
          text2: "Unable to send reset email. Please try again.",
        });
      }
    } finally {
      setLoading(false);
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
              source={{ uri: "/Forgotpassword.gif" }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter the email address you use.{"\n"}We'll send you a code to
              reset your password.
            </Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#e6ffe7"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
            </View>

            {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.sendButton, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.sendButtonText}>
                {loading ? "Sending..." : "Send Code"}
              </Text>
            </TouchableOpacity>

            <View style={styles.backToLoginContainer}>
              <Text style={styles.backToLoginText}>Back to </Text>
              <TouchableOpacity onPress={onLoginClick}>
                <Text style={styles.backToLoginLink}>Login</Text>
              </TouchableOpacity>
            </View>
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
    marginBottom: 20,
    color: "#023116",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
    lineHeight: 22,
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
  input: {
    backgroundColor: "#80a188",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
    borderWidth: 0,
  },
  errorMessage: {
    color: "#dc3545",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: "rgba(8, 109, 3, 0.977)",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 45,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "rgba(8, 109, 3, 0.5)",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  backToLoginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backToLoginText: {
    fontSize: 14,
    color: "#333",
  },
  backToLoginLink: {
    fontSize: 14,
    color: "rgba(8, 109, 3, 0.977)",
    textDecorationLine: "underline",
    fontWeight: "500",
  },
});

export default ForgetPasswordScreen;
