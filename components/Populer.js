import React from "react";
import { StyleSheet, View, Image, Text, Pressable } from "react-native";
import UpdateRecipe from "./Modal/UpdateRecipe";
import { useNavigation } from "expo-router";
// import { MaterialIcons } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import axios from "axios";
import { AntDesign, Feather, Foundation, Ionicons } from "@expo/vector-icons";
const Populer = ({ recipes_title, recipes_id, users_id, recipes_photo, getData }) => {
  const navigation = useNavigation();
  const Likeitem = async () => {
    try {
      const data = {
        recipes_id: recipes_id,
        users_id: users_id,
      };
      const likes = await axios.post("http://172.20.10.2:7474/likeds", data);
      if (likes.data.statusCode === 201) {
        alert("Like Recipe Success");
      } else if (likes.data.message === "Like Already") {
        alert("Liked Already");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const Saveitem = async () => {
    try {
      const data = {
        recipes_id: recipes_id,
        users_id: users_id,
      };
      const saveds = await axios.post("http://172.20.10.2:7474/bookmarks", data);
      if (saveds.data.statusCode === 201) {
        alert("Bookmark Recipe Success");
      } else if (saveds.data.message === "Bookmark Already") {
        alert("Bookmark Already");
      }
      const result = saveds.data.data;

      dispatch({ type: "CREATE_SAVED", payload: result });
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <>
      <View style={styles.popularCard}>
        <Image source={recipes_photo === "null" || recipes_photo === null || recipes_photo === "" ? require("../assets/Group43.png") : { uri: recipes_photo }} style={styles.popularImage} />
        <View>
          <Text style={styles.popularText} numberOfLines={1}>
            {/* {recipe?.title} */}
            {recipes_title}
          </Text>
          <Text>spicy, salted</Text>
        </View>
        <Pressable style={styles.item} onPress={Likeitem}>
          <AntDesign name="like2" size={30} style={{ backgroundColor: "white" }} />
        </Pressable>

        <Pressable style={styles.delete} onPress={Saveitem}>
          <Ionicons name="bookmark-outline" size={24} color="black" style={{ backgroundColor: "white" }} />
        </Pressable>
      </View>
    </>
  );
};

export default Populer;

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
    marginBottom: 20,
    marginLeft: 90,

    color: "#EEC302",
  },
  delete: {
    marginBottom: 20,
    marginRight: 1,
  },
});
