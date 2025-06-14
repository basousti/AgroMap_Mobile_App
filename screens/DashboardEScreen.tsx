import type React from "react"
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import AsyncStorage from "@react-native-async-storage/async-storage"

const DashboardEScreen: React.FC = () => {
  const navigation = useNavigation()

  const handleLogout = async () => {
    await AsyncStorage.removeItem("token")
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" as never }],
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Employee Dashboard</Text>
        <Text style={styles.subtitle}>Welcome, Employee!</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#023116",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: "#666",
  },
  button: {
    backgroundColor: "#dc3545",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default DashboardEScreen
