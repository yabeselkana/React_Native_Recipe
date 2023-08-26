import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
// import { Icon } from "react-native-vector-icons/Icon";
import { InfoIcon, NativeBaseProvider } from "native-base";
import { Icon } from "@rneui/themed";
import { useNavigation } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect } from "react";
import Populer from "../../components/Populer";

const MoreScreen = () => {
  const [user, setUser] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    getDataid();
  }, []);

  const getDataid = async () => {
    axios
      .get(`http://172.20.10.2:7474/recipes`)
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
          <Text style={styles.headerText}>More Info</Text>
        </View>
        <ScrollView style={{ padding: 10 }}>
          {data?.map((item) => {
            return <Populer recipes_title={item.recipes_title} recipes_id={item.recipes_id} users_id={item.users_id} recipes_photo={item.recipes_photo} getData={getDataid} />;
          })}
        </ScrollView>
      </NativeBaseProvider>
    </>
  );
};

export default MoreScreen;

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
