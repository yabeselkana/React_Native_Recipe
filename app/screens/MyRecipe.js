import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
// import { Icon } from "react-native-vector-icons/Icon";
import { InfoIcon, NativeBaseProvider } from "native-base";
import { Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import MyRecipes from "../../components/MyRecipes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";

const MyRecipe = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    const iduser = await AsyncStorage.getItem("users_id");
    axios
      .get(`http://172.20.10.2:7474/recipes/users/${iduser}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.log(error));
  };

  const router = useNavigation();
  return (
    <>
      <NativeBaseProvider>
        <View style={styles.header}>
          <Pressable onPress={() => router.goBack()} style={{ marginRight: 20 }}>
            <Icon name="chevron-left" size={30} color="#EEC302" />
          </Pressable>
          <Text style={styles.headerText}>My Recipes</Text>
        </View>
        <ScrollView style={{ padding: 10 }}>
          {data?.map((item) => {
            return <MyRecipes recipes_title={item.recipes_title} recipes_id={item.recipes_id} recipes_video={item.recipes_video} recipes_photo={item.recipes_photo} recipes_ingredients={item.recipes_ingredients} getData={getDataid} />;
          })}
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
};

export default MyRecipe;

const styles = StyleSheet.create({
  header: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  headerText: {
    color: "#000",
    fontSize: 20,
  },
  body: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
