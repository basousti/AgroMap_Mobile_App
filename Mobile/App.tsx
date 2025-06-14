import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import EnterCodeScreen from "./screens/EnterCodeScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import DashboardEScreen from "./screens/DashboardEScreen";

export type RootStackParamList = {
  Login: undefined;
  ForgetPassword: undefined;
  EnterCode: undefined;
  ResetPassword: undefined;
  DashboardE: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen} />
        <Stack.Screen name="EnterCode" component={EnterCodeScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
        <Stack.Screen name="DashboardE" component={DashboardEScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
