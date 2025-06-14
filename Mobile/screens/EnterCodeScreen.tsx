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

type EnterCodeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "EnterCode"
>;

const { width, height } = Dimensions.get("window");

const EnterCodeScreen: React.FC = () => {
  const navigation = useNavigation<EnterCodeScreenNavigationProp>();
  const [verificationCode, setVerificationCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!verificationCode) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please enter the verification code",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/Verif/Code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verificationCode }),
      });

      const result = await response.json();

      if (response.ok) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Code verified successfully",
        });
        navigation.navigate("ResetPassword");
      } else {
        setMessage("Error: " + result.message);
        Toast.show({
          type: "error",
          text1: "Error",
          text2: result.message,
        });
      }
    } catch (error: any) {
      setMessage("Error: Network error. Please try again.");
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Please try again.",
      });
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
              source={{ uri: "/EnterCode.gif" }}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            <Text style={styles.title}>Enter Confirmation Code</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Verification code</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter verification code"
                placeholderTextColor="#e6ffe7"
                value={verificationCode}
                onChangeText={setVerificationCode}
                keyboardType="number-pad"
                maxLength={6}
              />
            </View>

            {message ? (
              <Text style={styles.errorMessage}>{message}</Text>
            ) : null}

            <TouchableOpacity
              style={[styles.submitButton, loading && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.submitButtonText}>
                {loading ? "Verifying..." : "Submit"}
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
  input: {
    backgroundColor: "#80a188",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: "#fff",
    borderWidth: 0,
    textAlign: "center",
    letterSpacing: 2,
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

export default EnterCodeScreen;
