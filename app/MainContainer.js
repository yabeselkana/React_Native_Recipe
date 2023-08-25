import { View, Text } from "react-native";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
// import HomeScreen from "./screens/HomeScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import ChatScreen from "./screens/ChatScreen";
import ProfileScreen from "./screens/ProfileScreen";
import HomeScreen from "./screens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import { AntDesign } from "@expo/vector-icons";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Screen names
const homeName = "Home";
const profilesName = "Profile";
const addRecipesName = "Add Recipe";
const chatsName = "Chat";

const Tab = createBottomTabNavigator();

const MainContainer = () => {

  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      // initialRouteName={homeName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === homeName) {
            iconName = focused ? "home" : "home";
          } else if (rn === addRecipesName) {
            iconName = focused ? "pluscircleo" : "pluscircleo";
          } else if (rn === chatsName) {
            iconName = focused ? "wechat" : "wechat";
          } else if (rn === profilesName) {
            iconName = focused ? "user" : "user";
          }

          // You can return any component that you like here!
          return <AntDesign name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#EEC302",
        inactiveTintColor: "grey",
        labelStyle: { paddingBottom: 10, fontSize: 10 },
        style: { padding: 10, height: 70 },
        headerShown: false,
      }}
      options={{
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tab.Screen name={homeName} component={HomeScreen} />
      <Tab.Screen name={addRecipesName} component={AddRecipeScreen} />
      <Tab.Screen name={chatsName} component={ChatScreen} />
      <Tab.Screen name={profilesName} component={ProfileScreen} />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default MainContainer;
