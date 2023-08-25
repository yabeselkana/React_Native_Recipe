import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

import NavBotton from "../MainContainer";

import LoginScreen from "./Login";

import RegisterScreen from "./Register";

const MainAuth = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainAuth;

const styles = StyleSheet.create({});
