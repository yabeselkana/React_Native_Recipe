import { StyleSheet, useColorScheme, ScrollView, View, Image, Text, Dimensions, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
// import { Icon } from "react-native-vector-icons";
import { IconButton } from "react-native-paper";

import { Icon } from "@rneui/themed";
// import { Icon } from "native-base";
// import { Icon } from "react-native-vector-icons/Icon";
// import Icon from "react-native-paper/lib/typescript/components/Icon";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useIsFocused } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProfileScreen = ({ navigation }) => {
  const router = useNavigation();
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();

  useEffect(() => {
    if (isFocus) {
      getData();
    }
  }, []);

  const getData = async () => {
    const dataUser = await AsyncStorage.getItem("users_id");
    await axios
      .get(`http://172.20.10.5:7474/users/profile/${dataUser}`)
      .then((response) => {
        console.log(response.data.data[0]);
        setData(response.data.data[0]);
      })
      .catch((error) => console.log(error));
  };

  const editProfile = () => {
    navigation.navigate("EditProfile", {
      users_id: data.users_id,
      users_name: data.users_name,
      users_phone: data.users_phone,
      users_photo: data.users_photo,
      getData,
    });
  };
  const LikeItem = () => {
    navigation.navigate("Like", {
      users_id: data.users_id,

      getData,
    });
  };
  const Saveitem = () => {
    navigation.navigate("Save", {
      users_id: data.users_id,

      getData,
    });
  };
  const Logout = async () => {
    const logout = await AsyncStorage.clear();
    navigation.navigate("MainAuth");
    return logout;
  };
  return (
    <View>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={{ backgroundColor: "#EEC302" }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              paddingTop: 80,
              paddingBottom: 40,
            }}
          >
            <Image source={require("../../assets/Ellipse50.png")} style={styles.profileIcon} />
            <Text
              style={{
                marginTop: 20,
                marginBottom: 20,
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
              }}
            >
              {data?.users_name}
            </Text>
          </View>
        </View>
        <View style={styles.profileCard}>
          <TouchableOpacity onPress={editProfile}>
            <View style={styles.list}>
              <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <MaterialIcons name="person" size={30} color="#EEC302" />
                <Text style={{ fontSize: 16, color: "black" }}>Edit Profile</Text>
              </View>
              <Icon name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.navigate("MyRecipe")}>
            <View style={styles.list}>
              <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <Icon name="cloud-upload" size={25} color="#EEC302" />
                <Text style={{ fontSize: 16, color: "black" }}>My Recipe</Text>
              </View>
              <Icon name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={Saveitem}>
            <View style={styles.list}>
              <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <Icon name="save" size={30} color="#EEC302" />
                <Text style={{ fontSize: 16, color: "black" }}>Saved Recipe</Text>
              </View>
              <Icon name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={LikeItem}>
            <View style={styles.list}>
              <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <MaterialIcons name="star" size={30} color="#EEC302" />
                <Text style={{ fontSize: 16, color: "black" }}>Liked Recipe</Text>
              </View>
              <Icon name="chevron-right" size={30} color="black" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={Logout}>
            <View style={styles.list}>
              <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
                <MaterialIcons name="logout" size={30} color="#EEC302" />
                <Text style={{ fontSize: 16, color: "black" }}>Logout</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View></View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileIcon: {
    padding: 20,
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  profileCard: {
    marginTop: -30,
    marginLeft: 10,
    marginRight: 10,
    padding: 20,
    paddingBottom: 300,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  list: {
    paddingTop: 20,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
