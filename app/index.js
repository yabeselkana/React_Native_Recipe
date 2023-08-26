import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();
// import UpdateRecipe from "../components/Modal/UpdateRecipe";
import DetailVideo from "./screens/DetailVideo";
import Detail from "./screens/Detail";
import Like from "./screens/Like";
import Save from "./screens/Save";
import MoreScreen from "./screens/MoreScreen";
import EditProfile from "./screens/EditProfile";
import UpdateRecipe from "./screens/UpdateRecipe";
import ProfileScreen from "./screens/ProfileScreen";
import NavButton from "./MainContainer";
import MainAuth from "./Auth/MainAuth";
import { useState } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MyRecipe from "./screens/MyRecipe";
import { useNavigation } from "expo-router";

export default function Page() {
  const [token, setToken] = useState("");

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="MainAuth">
        <Stack.Screen
          name="MainAuth"
          component={MainAuth}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="NavButton"
          component={NavButton}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="MyRecipe"
          component={MyRecipe}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="UpdateRecipe"
          component={UpdateRecipe}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MoreScreen"
          component={MoreScreen}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Like"
          component={Like}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Save"
          component={Save}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailVideo"
          component={DetailVideo}
          options={{
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
