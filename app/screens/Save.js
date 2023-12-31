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

import MySave from "../../components/MySave";

const Save = ({ route, navigation }) => {
  const { users_id } = route.params;
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    try {
      axios
        .get(`http://172.20.10.2:7474/bookmarks/${users_id}`)
        .then((result) => {
          console.log(result);
          setData(result.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {}
  };

  const router = useNavigation();
  return (
    <>
      <NativeBaseProvider>
        <View style={styles.header}>
          <Pressable onPress={() => router.goBack()} style={{ marginRight: 20 }}>
            <Icon name="chevron-left" size={30} color="#EEC302" />
          </Pressable>
          <Text style={styles.headerText}>Save</Text>
        </View>
        <ScrollView style={{ padding: 10 }}>
          {data?.map((item) => {
            return <MySave recipes_title={item?.recipes_title} recipes_id={item?.recipes_id} users_id={item?.users_id} recipes_photo={item?.recipes_photo} bookmarks_id={item?.bookmarks_id} getData={getDataid} />;
          })}
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
};

export default Save;

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
