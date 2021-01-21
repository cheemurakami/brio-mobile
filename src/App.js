import { persistor, store } from "./rdx/store";

import LandingNavigation from "./screens/landing/LandingNavigation.js";
import LoginPage from "./screens/standard/LoginPage";
import { NavigationContainer } from "@react-navigation/native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import React from "react";
import RegisterPage from "./screens/standard/RegisterPage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import StandardNavigation from "./screens/standard/StandardNavigation.js";
import { StatusBar } from "expo-status-bar";
import { createStackNavigator } from "@react-navigation/stack";

const RootStack = createStackNavigator();

export default function App() {
  console.disableYellowBox = true;
  return (
    <>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar style="auto" />
            <NavigationContainer>
              <RootStack.Navigator
                screenOptions={{
                  headerShown: false,
                }}
              >
                <RootStack.Screen
                  name="LandingNavigation"
                  component={LandingNavigation}
                />
                <RootStack.Screen name="Login" component={LoginPage} />
                <RootStack.Screen name="RegisterPage" component={RegisterPage} />
                <RootStack.Screen
                  name="StandardNavigation"
                  component={StandardNavigation}
                />
              </RootStack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </>
  );
}
