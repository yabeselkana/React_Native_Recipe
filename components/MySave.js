import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import UpdateRecipe from "./Modal/UpdateRecipe";
import { useNavigation } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { AntDesign, Feather, Foundation, Ionicons } from "@expo/vector-icons";
const MySave = ({ recipes_title, bookmarks_id, recipes_photo, getData }) => {
  const navigation = useNavigation();

  const DaleteSave = async () => {
    axios
      .delete(`http://172.20.10.5:7474/bookmarks/${bookmarks_id}`)
      .then((result) => {
        console.log(result);
        alert("Delete Save");
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.popularCard}>
        <Image source={recipes_photo === "null" || recipes_photo === null || recipes_photo === "" ? require("../assets/Group43.png") : { uri: recipes_photo }} style={styles.popularImage} />
        <View>
          <Text style={styles.popularText} numberOfLines={1}>
            {recipes_title}
          </Text>
          <Text>spicy, salted</Text>
        </View>
        <Pressable style={styles.item} onPress={DaleteSave}>
          <Ionicons name="bookmark-outline" size={24} color="black" style={{ backgroundColor: "white" }} />
        </Pressable>
      </View>
    </>
  );
};

export default MySave;

const styles = StyleSheet.create({
  popularCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 15,
    flexDirection: "row",
    gap: 20,
    zIndex: 1,
  },
  popularText: {
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "800",
    color: "black",
  },
  popularImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
  },
  item: {
    marginBottom: 6,
    marginLeft: 90,
  },
  delete: {
    marginBottom: 20,
    marginRight: 1,
  },
});
